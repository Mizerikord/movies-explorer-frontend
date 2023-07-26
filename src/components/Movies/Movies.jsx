import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import MenuPopup from '../MenuPopup/MenuPopup';
import Footer from '../Footer/Footer';


function Movies(props) {

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

export default Movies;