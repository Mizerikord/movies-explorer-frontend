import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList() {

    return (
        <section className="cards">
            <ul className="cards__container">
                <MoviesCard />
            </ul>
            <button className="cards__add btn-blackout">Ещё</button>
        </section>
    );
}

export default MoviesCardList;