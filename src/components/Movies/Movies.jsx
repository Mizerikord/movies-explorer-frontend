import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import MenuPopup from '../MenuPopup/MenuPopup';


function Movies(props) {

    function handleSearchText(onSearch){
        props.onSearch(onSearch.text);
        localStorage.searchText = onSearch.text;
    }

    return (
        <main className='main'>
            <SearchForm onSearch={handleSearchText} check={props.check} onCheck={props.onCheck} parent={"movies"}/>
            <MoviesCardList cards={props.movies} onFavourite={props.onFavourite} onSaved={props.onSaved} isFavourite={props.isFavourite} parent={"movies"}/>
            <Preloader />
            <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
        </main>
    );
}

export default Movies;