import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './main.css';
import AboutProject from './AboutProject/AboutProject.jsx';
import AboutMe from './AboutMe/AboutMe.jsx';
import Tech from './Techs/Techs.jsx';
import Promo from './Promo/Promo';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';



function Main(props) {

    return (
        <CurrentUserContext.Provider value={''}>
            <Header onMenuPopup={props.onMenuPopup} />
            <Routes>
                <Route path="/" element={
                    <>
                        <Promo />
                        <AboutProject />
                        <Tech />
                        <AboutMe />
                        <Footer />
                    </>
                } />
                <Route path="/movies" element={<Movies isOpen={props.isOpen} onClose={props.onClose} />} />
                <Route path="/saved-movies" element={<SavedMovies isOpen={props.isOpen} onClose={props.onClose} />} />
                <Route path="/profile" element={<Profile
                    onMenuPopup={props.onMenuPopup}
                    isOpen={props.isOpen}
                    onClose={props.onClose}
                />} />
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default Main;
