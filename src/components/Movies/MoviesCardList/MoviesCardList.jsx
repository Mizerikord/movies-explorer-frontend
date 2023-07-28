import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList() {

    return (
        <section className="cards" aria-label="Кинопоиск">
            <ul className="cards__container">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard favourite={true}/>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard favourite={true}/>
                <MoviesCard />
                <MoviesCard favourite={true}/>
                <MoviesCard />
                <MoviesCard />

            </ul>
            <button className="cards__add btn-blackout">Ещё</button>
        </section>
    );
}

export default MoviesCardList;