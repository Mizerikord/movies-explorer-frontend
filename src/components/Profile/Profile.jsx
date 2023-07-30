import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './profile.css';
import logo from '../../images/logo.svg';
import MenuPopup from '../MenuPopup/MenuPopup';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {

    return (
        <CurrentUserContext.Provider value={''}>
            <Routes>
                <Route path="/" element={
                    <>
                        <header className="header">
                            <Link to="/" className="link"><img src={logo} alt="логотип" className="header__logo" /></Link>
                            <div className="header__login-container">
                                <ul className="film-links main-film-links">
                                    <li className="film-link">
                                        <Link to="/movies" className="login-link login-main">Фильмы</Link>
                                        <Link to="/" className="login-link login-link_active login-link-saved login-main">Сохраненные фильмы</Link>
                                    </li>
                                    <li className="film-link">
                                        <Link to="/" className="main-login-button link">Аккаунт</Link>
                                        <div className="menu-stack link" onClick={props.onMenuPopup}>
                                            <div className="menu-line"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </header>
                        <section className="profile" aria-label="Профиль">
                            <h2 className="profile__title" lang="ru">Привет, Виталий!</h2>
                            <form name="profile" className="form" noValidate>
                                <label className="form__box underline">
                                    <div className="form-wrapper">
                                        <p className="input-name" lang="ru">Имя:</p>
                                        <input type="text" name="name" id=""
                                            className="form__elem form__elem_name" placeholder="Ваше имя" />
                                    </div>
                                    <span className="name-error profile-elem-error"></span>
                                </label>
                                <label className="form__box">
                                    <div className="form-wrapper">
                                        <p className="input-name" lang="en">E-mail:</p>
                                        <input type="email" name="email" id=""
                                            className="form__elem form__elem_email" placeholder="Ваш e-mail" />
                                    </div>
                                    <span className="email-error profile-elem-error"></span>
                                </label>
                            </form>
                            <div className="profile-btns-container">
                                <Link to="/profile" className="profile-link">Редактировать</Link>
                                <Link to="/" className="profile-link leave-link">Выйти из аккаунта</Link>
                            </div>
                        </section>
                        <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
                    </>
                }>
                </Route>
            </Routes>

        </CurrentUserContext.Provider >
    );
}

export default Profile;
