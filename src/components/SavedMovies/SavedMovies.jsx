import React from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MenuPopup from '../MenuPopup/MenuPopup';

function SavedMovies(props) {
    
    let isFavourite = props.isFavourite;

    if (props.check) {
        isFavourite = isFavourite.filter((elem) => {
            if (elem.duration >= 40) {
                return false
            }
            return elem
        })
    }

    return (
        <>
            <SearchForm onSearch={props.onSearch} check={props.check} onCheck={props.onCheck} />
            <MoviesCardList cards={isFavourite} isFavourite={props.isFavourite} onFavourite={props.onFavourite} onSaved={props.onSaved} />
            <Preloader />
            <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
        </>
    );
}

export default SavedMovies;