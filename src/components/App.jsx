import React from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import Errors from './Errors/Errors';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SavedMovies from './SavedMovies/SavedMovies';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext";
import MainApi from '../utils/MainApi.js';
import ProtectedRouteElement from './ProtectedRoute/ProtectedRoute';
import movieApi from '../utils/MovieApi.js';
import Preloader from './Movies/Preloader/Preloader';
import MenuPopup from './MenuPopup/MenuPopup';
import constants from '../utils/constants';

function App() {

  const [currentUser, setcurrentUser] = useState({ name: "", email: "" });
  const [isOpen, setPopupOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  const [isAllMovies, setIsAllMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const [isSavedChecked, setIsSavedChecked] = useState(false);

  const [isAllSearchFavourite, setAllSearchFavourite] = useState([]);
  const [isFavourite, setFavourite] = useState([]);
  const [isFilteredFavourite, setIsFilteredFavourite] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  let location = useLocation();

  //Запуск проверки токена
  useEffect(() => {
    function handleCheckToken() {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        setIsTokenVerified(true)
        return
      }
      MainApi.getUserData(jwt)
        .then((data) => {
          if (data) {
            setcurrentUser(data);
            setloggedIn(true);
            getSavedMovies();
            getAllMovie();
            setFavourite(isAllSearchFavourite);
            setIsTokenVerified(true);
          } else {
            setloggedIn(false);
            localStorage.removeItem('jwt');
            handleSignOut();
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
          handleSignOut();
        })
    }
    handleCheckToken();
  }, [loggedIn])

  //Получение данных пользователя
  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    const jwt = localStorage.getItem('jwt');
    MainApi.getUserData(jwt)
      .then(res => {
        setcurrentUser(res)
      })
      .catch((res) => {
        console.log(res);
      })
  }, [loggedIn]);

  //Авторизация
  function handleUserAutorization(userData) {
    setIsLoading(true);
    MainApi.postUserAutorization(userData)
      .then((userData) => {
        if (userData) {
          MainApi._setToken(userData.token);
          localStorage.setItem('jwt', userData.token);
          setloggedIn(true);
          navigate('/movies');
        } else {
          setloggedIn(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setloggedIn(false);
        setMessage(`При авторизации произошла ошибка, попробуйте позже`);
      })
  }

  //сброс оповещения при редиректе
  useEffect(() => {
    if (location.pathname === "/movies") {
      setIsChecked(localStorage.short === "true" ? true : false)
      if (localStorage.movies != undefined) {
        const localMovies = JSON.parse(localStorage.movies);
        // setMovies(findedMovies);
        setSearchMovies(localMovies);
        setMovies(filterOnShort(localStorage.short === "true" ? true : false, localMovies));
      }
    }
    if (location.pathname === "/saved-movies") {
      setAllSearchFavourite(isAllSearchFavourite)
      setFavourite(isAllSearchFavourite);
      setIsFilteredFavourite(isAllSearchFavourite);
      setIsSavedChecked(false);
    }
    setMessage("");
  }, [location])

  const handleMenuPopup = () => {
    setPopupOpen(true);
  }

  const closeAllPopups = () => {
    setPopupOpen(false);
  }

  //Регистрация пользователя
  function handleUserRegistration(userData) {
    const currentUserData = userData;
    setIsLoading(true);
    MainApi.postNewUser(userData)
      .then((userData) => {
        if (userData) {
          handleUserAutorization({
            email: currentUserData.email, password: currentUserData.password
          });
        } else {
          setloggedIn(true);
        }
        setIsLoading(true);
      })
      .catch((err) => {
        if (err === "409") {
          setMessage("Пользователь с таким email уже существует.");
          return;
        }
        setMessage(`При регистрации профиля произошла ${err} ошибка, попробуйте позже`);
      })
  }

  //Редактор профиля
  function handleProfileEditor(userData) {
    setIsLoading(true);
    MainApi.patchUserData(userData)
      .then((res) => {
        setcurrentUser(res);
        setMessage('Данные успешно обновлены');
      })
      .catch(err => {
        if (err === "409") {
          setMessage("Пользователь с таким email уже существует.");
          return;
        }
        setMessage(`При обновлении профиля произошла ошибка, попробуйте позже`);
      })
  }

  //Выход из аккаунта
  function handleSignOut() {
    setloggedIn(false);
    localStorage.clear();
    setMessage("");
    setMovies([]);
    setSearchMovies([]);
    setFavourite([]);
    setIsFilteredFavourite([]);
    setAllSearchFavourite([]);
    setIsAllMovies([]);
    setSearchMovies([]);
    navigate('/');
  }

  //получаем сохраненные фильмы
  function getSavedMovies() {
    setIsLoading(true);
    MainApi.getMovies()
      .then((res) => {
        setAllSearchFavourite(res);
        setIsFilteredFavourite(res);
        setFavourite(res)
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.status);
        setIsLoading(false);
      })
  }

  function getAllMovie() {
    setIsLoading(true);
    movieApi.getMovies()
      .then((movies) => {
        setIsAllMovies(movies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
      })
  }

  //Получение списка фильмов по данным поиска
  function handleSearchMovies(data) {
    setCount(0);
    localStorage.searchText = data;
    setIsLoading(true);
    const filteredMovies = isAllMovies;
    const result = filterOnSearch(filteredMovies, data.toLowerCase());
    if (result.length === 0) {
      setMessage("К сожалению, ничего не нашлось ):");
      setMovies(result);
      localStorage.movies = JSON.stringify(result);
      return
    }
    localStorage.movies = JSON.stringify(filterOnShort(isChecked, result));
    setSearchMovies(result);
    setMovies(filterOnShort(isChecked, result));
    setIsLoading(false);
  }

  //Поиск из сохраненных видео
  function handleSearchSavedMovies(data) {
    setIsSearch(true);
    setCount(0);
    setIsLoading(true);
    const filteredSearchMovies = isAllSearchFavourite;
    const result = filterOnSearch(filteredSearchMovies, data.toLowerCase());
    if (result.length === 0) {
      setMessage("К сожалению, ничего не нашлось ):")
      setFavourite(result);
      return;
    }
    setIsFilteredFavourite(result);
    setFavourite(filterOnShort(isSavedChecked, result));
    setIsLoading(false);
  }

  //Фильтрация по поисковой строке
  function filterOnSearch(videoElem, searchText) {
    const result = videoElem.filter((elem) => {
      if (elem["id"] !== undefined) {
        //меняем данные подстать базе
        elem.movieId = elem.id;
        delete elem["id"];
        elem.image = constants.imgUrl + elem.image.url;
      }
      //делаем регистронезависымый поиск
      const searchElem = elem.nameRU.toLowerCase();
      //для лучшего результата ищем данные по всем полям
      return searchElem.includes(searchText);
    })
    return result
  }

  //фильтрация которких видео
  function filterOnShort(check, video) {
    let result = video;
    result = result.filter((elem) => {
      if (check && elem.duration >= constants.short) {
        return false;
      }
      return true;
    })
    return result;
  }

  //Включение фильтра короткометражек
  function handleChecked() {
    if (isChecked) {
      setIsChecked(false);
      localStorage.short = !isChecked;
      setMovies(filterOnShort(!isChecked, searchMovies));
      return;
    }
    setIsChecked(true);
    localStorage.short = !isChecked;
    setMovies(filterOnShort(!isChecked, searchMovies));
  }

  //Включение фильтра короткометражек для сохраненных фильмов
  function handleSavedChecked() {
    if (isSavedChecked) {
      setIsSavedChecked(false);
      setFavourite(filterOnShort(!isSavedChecked, isFilteredFavourite));
      return;
    }
    setIsSavedChecked(true);
    setFavourite(filterOnShort(!isSavedChecked, isFilteredFavourite));
  }

  function deleteElem(arr, elem) {
    let deletePosition = arr.map(item => {
      return item.movieId
    }).indexOf(elem.data.movieId);
    arr.splice(deletePosition, 1);
    return arr;
  }

  //Добавление карточки в избранное и удаление
  function handleToggleStatusCard(movieCard) {
    setIsLoading(true);
    const filteredFavourite = isAllSearchFavourite;
    if (isAllSearchFavourite.some(i => i.movieId === movieCard.movieId)) {
      const [deletedCard] = filteredFavourite.filter((elem) => elem.movieId === movieCard.movieId)
      //запрос на удаление карточки
      MainApi.deleteMovie(deletedCard)
        .then(res => {
          if (!isSearch) {
            if(isSavedChecked){
              setAllSearchFavourite(deleteElem(isAllSearchFavourite, res));
              setIsFilteredFavourite(isAllSearchFavourite);
              setFavourite(filterOnShort(isSavedChecked, isFilteredFavourite))
              setIsLoading(false);
              return;
            }
            setAllSearchFavourite(deleteElem(isAllSearchFavourite, res));
            setFavourite(isAllSearchFavourite);
            setIsLoading(false);
            return;
          }
          if(isSavedChecked){
            setAllSearchFavourite(deleteElem(isAllSearchFavourite, res));
            setIsFilteredFavourite(deleteElem(isFilteredFavourite, res));
            setFavourite(filterOnShort(isSavedChecked, isFilteredFavourite))
            setIsLoading(false);
            return;
          }
          setAllSearchFavourite(deleteElem(isAllSearchFavourite, res));
          setIsFilteredFavourite(deleteElem(isFilteredFavourite, res));
          setFavourite(deleteElem(isFavourite, res));
          setIsLoading(false);
          return;
        })
        .catch(res => {
          console.log(res)
          setMessage("При удалении видео произошла ошибка");
        });
      return;
    }
    MainApi.postNewMovie({
      movieId: movieCard.movieId,
      country: movieCard.country,
      director: movieCard.director,
      duration: movieCard.duration,
      year: movieCard.year,
      description: movieCard.description,
      image: movieCard.image,
      trailerLink: movieCard.trailerLink,
      thumbnail: movieCard.image,
      nameRU: movieCard.nameRU,
      nameEN: movieCard.nameEN,
      owner: currentUser._id,
      created_at: movieCard.created_at,
      updated_at: movieCard.updated_at,
    })
      .then((newMovie) => {
        //обновляем данные
        newMovie.movieId = movieCard.movieId;
        isAllSearchFavourite.push(newMovie);
        setAllSearchFavourite(isAllSearchFavourite);
        setIsLoading(false);
      })
      .catch(res => {
        console.log(res.status)
        setMessage("При добавлении видео произошла ошибка");
      })
  }

  //Очищаем сообщения об ошибках в профиле
  function handleReset() {
    setMessage("");
    setIsLoading(false);
  }
  //изменение количества карточек отображаемых на экране
  function handleAddCards() {
    setCount(count + 1)
  }

  return (isTokenVerified &&
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onMenuPopup={handleMenuPopup} loggedIn={loggedIn} />
        <Routes>
          <Route path="/signin" element={loggedIn ? <Navigate to="/movies" replace /> : <Login onLogin={handleUserAutorization} />} />
          <Route path="/signup" element={loggedIn ? <Navigate to="/movies" replace /> : <Register onRegister={handleUserRegistration} />} />
          <Route
            path="/"
            element={<Main
              onClose={closeAllPopups}

            />} />
          <Route
            path="/movies"
            element={<ProtectedRouteElement
              loggedIn={loggedIn}
              component={Movies}
              movies={movies}
              onSearch={handleSearchMovies}
              check={isChecked}
              onCheck={handleChecked}
              onFavourite={handleToggleStatusCard}
              isFavourite={isAllSearchFavourite}
              addCards={handleAddCards}
              count={count}
            />} />
          <Route
            path="/saved-movies"
            element={<ProtectedRouteElement
              loggedIn={loggedIn}
              component={SavedMovies}
              onCheck={handleSavedChecked}
              check={isSavedChecked}
              onSearch={handleSearchSavedMovies}
              onFavourite={handleToggleStatusCard}
              isFavourite={isAllSearchFavourite}
              cards={isFavourite}
              addCards={handleAddCards}
              count={count} />
            } />
          <Route
            path="/profile"
            element={<ProtectedRouteElement
              loggedIn={loggedIn}
              component={Profile}
              onEdit={handleProfileEditor}
              onSignOut={handleSignOut}
              onReset={handleReset}
            />
            } />
          <Route path="*" element={<Errors navigate={navigate} />} />
        </Routes>
        <Footer />
        <Preloader isLoading={isLoading} message={message} onReset={handleReset} />
        <MenuPopup
          isOpen={isOpen}
          onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
