import React from 'react';
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

function MoviesCard(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const card = props.card;

    function convertDuration(time) {
        const min = time % 60;
        const hour = (time - min) / 60;
        const duration = hour.toString() + "ч " + min.toString() + "м";
        return duration
    }

    function handleSavedMovie() {
        props.onFavourite(card)
    }

    const isSave = props.isFavourite.some(i => i.movieId === card.movieId);

    const favourite = (
        `card-to-favourite btn-blackout ${isSave ? "card-to-favourite_active" : ""}`
    );

    return (
        <li className="card">
            <div className="card-info">
                <div className="card-name">
                    <h2 className="card-title" lang="ru">{card.nameRU}</h2>
                    <p className="card-time" lang="ru">{convertDuration(card.duration)}</p>
                </div>
                <button src="#" alt="Избранное" className={favourite} onClick={handleSavedMovie} />
            </div>
            <Link to={card.trailerLink} className='trailer-link link'><img src={card.image} alt="Некий постер фильма" className="card-img" /></Link>
        </li>
    );
}

export default MoviesCard;