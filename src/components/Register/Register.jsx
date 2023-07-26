import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './register.css';
import logo from '../../images/logo.svg';

function Register(props) {

    return (
        <Routes>
            <Route path="/" element={
                <section className="register">
                <Link to="/" className="link"><img src={logo} alt="логотип" className="auth-icon" /></Link>
                <h2 className="register-title">Добро пожаловать!</h2>
                <form action="" className="register-form" noValidate>
                    <label className="form-box">
                        <p className="form-text">Имя</p>
                        <input type="text" className="form-elem" placeholder='Виталий'/>
                        <span className="elem-error"></span>
                    </label>
                    <label className="form-box">
                        <p className="form-text">E-mail</p>
                        <input type="email" className="form-elem" placeholder='pochta@yandex.ru'/>
                        <span className="elem-error"></span>
                    </label>
                    <label className="form-box">
                        <p className="form-text">Пароль</p>
                        <input type="password" className="form-elem"/>
                        <span className="elem-error">Что-то пошло не так...</span>
                    </label>
                    <input type="submit" className="form-submit btn-blackout" value="Зарегистрироваться" />
                </form>
                <p className="register-msg">Уже зарегистрированы?<Link to="/signin" className="register-link link">Войти</Link></p>
            </section>
            }>
            </Route>

        </Routes>

    );
}

export default Register;
