import React from 'react';
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import './portfolio.css';
import arrow from '../../../images/student-link-icon.svg'


function Portfolio() {
    return (
        <Routes>
            <Route path="/" element={
                <div className="student__portfolio">
                    <h3 className="portfolio-header">Портфолио</h3>
                    <ul className="student-links">
                        <li className="student-item">
                            <p className="link-text">Статичный сайт</p>
                            <Link href="#" ><img src={arrow} alt="ссылка на Статичный сайт" className="link-icon link" /></Link>
                        </li>
                        <li className="student-item">
                            <p className="link-text">Адаптивный сайт</p>
                            <Link href="#" ><img src={arrow} alt="ссылка на Адаптивный сайт" className="link-icon link" /></Link>
                        </li>
                        <li className="student-item">
                            <p className="link-text">Одностраничное приложение</p>
                            <Link href="#" ><img src={arrow} alt="ссылка на Одностраничное приложение" className="link-icon link" /></Link>
                        </li>
                    </ul>
                </div>
            }>
            </Route>
        </Routes>
    );
}

export default Portfolio;
