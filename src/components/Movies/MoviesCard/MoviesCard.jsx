import React from 'react';
import favourite from '../../../images/favourite.svg';
import nonefavoureite from '../../../images/none-favourite.svg';
import { Routes, Route } from 'react-router-dom';
import testimage from '../../../images/uik.jpg';

function MoviesCard(props) {

    return (
        <Routes>
            <Route path="/" element={
                <li className="card">
                    <div className="card-info">
                        <div className="card-name">
                            <h2 className="card-title" lang="ru">33 слова о дизайне</h2>
                            <p className="card-time" lang="ru">1ч 47м</p>
                        </div>
                        <img src={props.favourite ? favourite : nonefavoureite} alt="Избранное" className='card-to-favourite btn-blackout' />
                    </div>
                    <img src={testimage} alt="Некий постер фильма" className="card-img" />
                </li>
            } />
        </Routes>
    );
}

export default MoviesCard;