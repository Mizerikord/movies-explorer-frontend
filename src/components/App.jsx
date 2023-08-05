import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {

  const [currentUser, setcurrentUser] = useState({ name: "", email: "" });
  const [isOpen, setPopupOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isFavourite, setFavourite] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  localStorage.short = checked;

  const navigate = useNavigate();

  const handleMenuPopup = () => {
    setPopupOpen(true);
  }

  const closeAllPopups = () => {
    setPopupOpen(false);
  }

  //проверка токена
  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    MainApi.getUserData(jwt)
      .then((data) => {
        if (data) {

          getSavedMovies();
          setcurrentUser(data);
          setIsTokenVerified(true);
          setloggedIn(true);
        } else {
          setloggedIn(false);
          localStorage.removeItem('jwt');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Запуск проверки токена при изменении статуса пользователя
  useEffect(() => {
    handleCheckToken();
  }, [loggedIn])

  //Редирект при изменении статуса пользователя
  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
    return;
  }, [loggedIn]);



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
    MainApi.postUserAutorization(userData)
      .then((userData) => {
        if (userData) {
          MainApi._setToken(userData.token);
          localStorage.setItem('jwt', userData.token);
          setloggedIn(true);
          navigate('/movies');
        } else {
          setloggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloggedIn(false);
      })
  }

  //Регистрация пользователя
  function handleUserRegistration(userData) {
    const currentUserData = userData;
    MainApi.postNewUser(userData)
      .then((userData) => {
        console.log(userData);
        if (userData) {
          handleUserAutorization({
            email: currentUserData.email, password: currentUserData.password
          });
        } else {
          setloggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloggedIn(false);
      })
  }

  //Редактор профиля
  function handleProfileEditor(userData) {
    setIsLoading(true);
    MainApi.patchUserData(userData)
      .then((res) => {
        setMessage('Данные успешно обновлены');
        setIsLoading(false);
      })
      .catch(err=>{
        if (err === "409") {
          setMessage("Пользователь с таким email уже существует.");
          setIsLoading(false);
          return;
        }
        setMessage(`При обновлении профиля произошла ошибка, попробуйте позже`);
        setIsLoading(false);
      })
  }

  //Выход из аккаунта
  function handleSignOut() {
    setloggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('short');
    localStorage.removeItem('searchText');
    navigate('/');
  }

  //Получение списка фильмов
  function handleSearchMovies() {
    setIsLoading(true);
    getSavedMovies();
    movieApi.getMovies()
      .then((movies) => {
        const result = movies.filter((elem) => {
          //меняем данные подстать базе
          elem.movieId = elem.id;
          delete elem["id"];
          elem.image = `https://api.nomoreparties.co${elem.image.url}`;
          //делаем регистронезависымый поиск
          const searchElem = Object.values(elem).join("").toLowerCase();
          //для лучшего результата ищем данные по всем полям
          return searchElem.includes(localStorage.searchText);
        })
        if(result.length === 0){
          setMessage("К сожалению, ничего не нашлось ):")
          return
        }
        setIsLoading(false);
        setMovies(result);
        localStorage.movies = JSON.stringify(result);
      })
      .catch((res) => {
        console.log(res)
      })
  }

  //Включение фильтра короткометражек
  function handleChecked() {
    if (checked) {
      setChecked(false);
      handleSearchMovies();
      return;
    }
    setChecked(true);
    handleSearchMovies();
  }

  //Добавление карточки в избранное и удаление
  function handleToggleStatusCard(movieCard) {
    if (isFavourite.some(i => i.movieId === movieCard.movieId)) {
      const deletedCard = isFavourite.filter((elem) => elem.movieId === movieCard.movieId)
      MainApi.deleteMovie(deletedCard[0])
        .then(res => {
          handleSearchMovies(localStorage.searchText);
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
      owner: movieCard.owner,
      nameRU: movieCard.nameRU,
      nameEN: movieCard.nameEN,
      owner: currentUser._id,
      created_at: movieCard.created_at,
      updated_at: movieCard.updated_at,
    })
      .then((newMovie) => {
        //Строка поиска из localStorage
        handleSearchMovies(localStorage.searchText)
      })
      .catch(res => console.log(res.status))
  }

  //сохраняем фильмы
  function getSavedMovies() {
    MainApi.getMovies()
      .then((res) => {
        setFavourite(res);
      })
      .catch(err => console.log(err.status))
  }

  //Очищаем сообщения об ошибках в профиле
  function handleReset(){
    setMessage("");
    setIsLoading(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onMenuPopup={handleMenuPopup} />
        <Routes>
          <Route
            path="/"
            element={<Main
              onClose={closeAllPopups}
            />} />
          <Route
            path="/movies"
            element={<ProtectedRouteElement
              component={Movies}
              loggedIn={loggedIn}
              movies={movies}
              onSearch={handleSearchMovies}
              check={checked}
              onCheck={handleChecked}
              onFavourite={handleToggleStatusCard}
              isFavourite={isFavourite}
            />} />
          <Route
            path="/saved-movies"
            element={<ProtectedRouteElement
              component={SavedMovies}
              loggedIn={loggedIn}
              onSearch={handleSearchMovies}
              check={checked}
              onCheck={handleChecked}
              onFavourite={handleToggleStatusCard}
              isFavourite={isFavourite} />
            } />
          <Route
            path="/profile"
            element={<ProtectedRouteElement
              component={Profile}
              loggedIn={loggedIn}
              onEdit={handleProfileEditor}
              message={message}
              onSignOut={handleSignOut}
              onReset={handleReset}
            />
            } />
          <Route path="/signin" element={<Login onLogin={handleUserAutorization} />} />
          <Route path="/signup" element={<Register onRegister={handleUserRegistration} />} />
          <Route path="*" element={<Errors />} />
        </Routes>
        <Footer />
        <Preloader isLoading={isLoading} message={message} onReset={handleReset}/>
        <MenuPopup isOpen={isOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
