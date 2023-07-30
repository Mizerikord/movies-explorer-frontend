import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import Errors from './Errors/Errors';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import { useState } from 'react';

function App() {


  const [isMenuPopupOpen, setPopupOpen] = useState(false);

  const handleMenuPopup = () => {
    setPopupOpen(true);
  }

  const closeAllPopups = () => {
    setPopupOpen(false);
  }


  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main
          onMenuPopup={handleMenuPopup}
          isOpen={isMenuPopupOpen}
          onClose={closeAllPopups}
        />} >
          <Route path="movies" element={<Movies />} />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="profile" element={<Profile
            onMenuPopup={handleMenuPopup}
            isOpen={isMenuPopupOpen}
            onClose={closeAllPopups}
          />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Errors />} />
      </Routes>
    </div>
  );
}

export default App;
