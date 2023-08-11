import React from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MenuPopup from '../MenuPopup/MenuPopup';

function SavedMovies(props) {

    function handleSearchText(onSearch){
        props.onSearch(onSearch.text);
    }

    return (
        <>
            <SearchForm onSearch={handleSearchText} check={props.check} onCheck={props.onCheck}/>
            <MoviesCardList cards={props.cards} isFavourite={props.isFavourite} onFavourite={props.onFavourite} onSaved={props.onSaved} addCards={props.addCards} count={props.count}/>
            <Preloader />
            <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
        </>
    );
}

export default SavedMovies;