import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext"
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MenuPopup from '../MenuPopup/MenuPopup';
import Footer from '../Footer/Footer';

function SavedMovies(props) {

    return (
        <CurrentUserContext.Provider value={''}>
            <Routes>
                <Route path="/" element={
                    <>
                        <SearchForm />
                        <MoviesCardList />
                        <Preloader />
                        <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
                        <Footer />
                    </>
                } />
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default SavedMovies;