import React from 'react';
import favourite from '../../../images/favourite.svg';
import { Routes, Route } from 'react-router-dom';
import testimage from '../../../images/uik.jpg'

function MoviesCard() {

    return (
        <Routes>
            <Route path="/" element={
                <li className="card">
                    <div className="card-info">
                        <div className="card-name">
                            <h2 className="card-title">33 слова о дизайне</h2>
                            <p className="card-time">1ч 47м</p>
                        </div>
                        <img src={favourite} alt="Избранное" className="card-to-favourite btn-blackout" />
                    </div>
                    <div className="card-img-container">
                        <img src={testimage} alt="" className="card-img" />
                    </div>
                </li>
            } />
        </Routes>
    );
}

export default MoviesCard;