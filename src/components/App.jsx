import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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

  const [searchMovies, setSearchMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const [isSavedChecked, setIsSavedChecked] = useState(false);

  const [isSearchFavourite, setSearchFavourite] = useState([]);
  const [isFavourite, setFavourite] = useState([]);
  const [isFilteredFavourite, setIsFilteredFavourite] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

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
            setIsTokenVerified(true)
          } else {
            setloggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
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
        const findedMovies = JSON.parse(localStorage.movies);
        setMovies(findedMovies);
        setSearchMovies(findedMovies);
      }
    }
    if (location.pathname === "/saved-movies") {
      getSavedMovies();
      setFavourite(isSearchFavourite);
      setIsFilteredFavourite(isSearchFavourite);
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
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('short');
    localStorage.removeItem('searchText');
    setMessage("");
    setMovies([]);
    setSearchMovies([]);
    setFavourite([]);
    setIsFilteredFavourite([]);
    setSearchFavourite([]);
    setSearchMovies([]);
    navigate('/');
  }

  //Получение списка фильмов
  function handleSearchMovies(data) {
    setIsLoading(true);
    movieApi.getMovies()
      .then((movies) => {
        const result = filterOnSearch(movies, data);
        if (result.length === 0) {
          setMessage("К сожалению, ничего не нашлось ):")
          setMovies(filterOnShort(isChecked, result));
          localStorage.short = isChecked;
          localStorage.movies = JSON.stringify(result);
          return;
        }
        setIsLoading(false);
        localStorage.movies = JSON.stringify(filterOnShort(isChecked, result));
        localStorage.short = isChecked;
        setSearchMovies(result);
        setMovies(filterOnShort(isChecked, result));
      })
      .catch((res) => {
        console.log(res)
      })
  }

  //Поиск из сохраненных видео
  function handleSearchSavedMovies(data) {
    setIsLoading(true);
    const result = filterOnSearch(isSearchFavourite, data);
    if (result.length === 0) {
      setMessage("К сожалению, ничего не нашлось ):")
      setFavourite(result);
      return;
    }
    setIsFilteredFavourite(result);
    setFavourite(filterOnShort(isSavedChecked, result));
    setIsLoading(false);
  }

  //получаем сохраненные фильмы
  function getSavedMovies() {
    setIsLoading(true);
    MainApi.getMovies()
      .then((res) => {
        setSearchFavourite(res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.status);
        setIsLoading(false);
      })
  }

  //Фильтрация по поисковой строке
  function filterOnSearch(videoElem, searchText) {
    const result = videoElem.filter((elem) => {
      if (elem["id"] != undefined) {
        //меняем данные подстать базе
        elem.movieId = elem.id;
        delete elem["id"];
        elem.image = constants.imgUrl + elem.image.url;
      }
      //делаем регистронезависымый поиск
      const searchElem = Object.values(elem).join("").toLowerCase();
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
      setMovies(filterOnShort(!isChecked, searchMovies));
      return;
    }
    setIsChecked(true);
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

  //Добавление карточки в избранное и удаление
  function handleToggleStatusCard(movieCard) {
    const filterFavourite = isSearchFavourite;
    if (isSearchFavourite.some(i => i.movieId === movieCard.movieId)) {
      const [deletedCard] = filterFavourite.filter((elem) => elem.movieId === movieCard.movieId)
      MainApi.deleteMovie(deletedCard)
        .then(res => {
          let movieId = isSearchFavourite.map(elem => {
            return elem.movieId
          }).indexOf(res.data.movieId);
          isSearchFavourite.splice(movieId, 1);
          setSearchFavourite(isSearchFavourite);
          setFavourite(filterFavourite.filter((elem) => !(elem.movieId === movieCard.movieId)));
          return;
        })
        .catch(res => console.log(res.status));
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
        isSearchFavourite.push(newMovie);
        setSearchFavourite(isSearchFavourite);
        setMovies(JSON.parse(localStorage.movies));
      })
      .catch(res => console.log(res.status))
  }

  //Очищаем сообщения об ошибках в профиле
  function handleReset() {
    setMessage("");
    setIsLoading(false);
  }

  return (isTokenVerified &&
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onMenuPopup={handleMenuPopup} loggedIn={loggedIn} />
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleUserAutorization} />} />
          <Route path="/signup" element={<Register onRegister={handleUserRegistration} />} />
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
              isFavourite={isSearchFavourite}
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
              isFavourite={isSearchFavourite}
              cards={isFavourite} />
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
