import logo from '../../images/logo.svg';
import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './header.css';
import '../MenuPopup/menupopup.css';

function Header({ onMenuPopup }) {

    return (
        <Routes>
            <Route path="/" element={
                <header className="header">
                    <Link to="/" className="link"><img src={logo} alt="логотип" className="header__logo" /></Link>
                    <div className="header__login-container">
                        <ul className="film-links">
                            <li className="film-link">
                                <Link to="/signup" className="login-link link">Регистрация</Link>
                            </li>
                            <li className="film-link">
                                <Link to="/signin" className="login-button link">Войти</Link>
                            </li>
                        </ul>
                    </div>
                </header>
            }>
            </Route >

            <Route path="/movies" element={
                <header className="header">
                    <Link to="/" className="link"><img src={logo} alt="логотип" className="header__logo" /></Link>
                    <div className="header__login-container">
                        <ul className="film-links main-film-links">
                            <li className="film-link">
                                <Link to="/" className="login-link login-link_active login-main">Фильмы</Link>
                                <Link to="/saved-movies" className="login-link login-link-saved login-main">Сохраненные фильмы</Link>
                            </li>
                            <li className="film-link">
                                <Link to="/profile" className="main-login-button link">Аккаунт</Link>
                                <div className="menu-stack link" onClick={onMenuPopup}>
                                    <div className="menu-line"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </header>
            }>
            </Route>

            <Route path="/saved-movies" element={
                <header className="header">
                    <Link to="/" className="link"><img src={logo} alt="логотип" className="header__logo" /></Link>
                    <div className="header__login-container">
                        <ul className="film-links main-film-links">
                            <li className="film-link">
                                <Link to="/movies" className="login-link  login-main">Фильмы</Link>
                                <Link to="/" className="login-link login-link_active login-link-saved login-main">Сохраненные фильмы</Link>
                            </li>
                            <li className="film-link">
                                <Link to="/" className="main-login-button link">Аккаунт</Link>
                                <div className="menu-stack link" onClick={onMenuPopup}>
                                    <div className="menu-line"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </header>
            }>
            </Route>

            <Route path="/signin" element={
                <header className="header">
                </header>
            }>
            </Route>

            <Route path="/signup" element={
                <header className="header">
                </header>
            }>
            </Route>

        </Routes >

    );
}

export default Header;
