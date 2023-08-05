import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import MenuPopup from '../MenuPopup/MenuPopup';


function Movies(props) {

    let movies = props.movies;

    if (props.check) {
        movies = movies.filter((elem) => {
            if (elem.duration >= 40) {
                return false
            }
            return elem
        })
    }

    return (
        <main className='main'>
            <SearchForm onSearch={props.onSearch} check={props.check} onCheck={props.onCheck}/>
            <MoviesCardList cards={movies} onFavourite={props.onFavourite} onSaved={props.onSaved} isFavourite={props.isFavourite} />
            <Preloader />
            <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
        </main>
    );
}

export default Movies;