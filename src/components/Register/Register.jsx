import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './register.css';
import logo from '../../images/logo.svg';

function Register(props) {

    return (
        <Routes>
            <Route path="/" element={
                <section className="auth" aria-label="Регистрация">
                <Link to="/" className="link"><img src={logo} alt="логотип" className="auth-icon" /></Link>
                <h2 className="auth-title" lang="ru">Добро пожаловать!</h2>
                <form action="" className="auth-form" noValidate>
                    <label className="form-box">
                        <p className="form-text" lang="ru">Имя</p>
                        <input type="text" className="form-elem" placeholder='Ваше имя'/>
                        <span className="elem-error"></span>
                    </label>
                    <label className="form-box">
                        <p className="form-text" lang="en">E-mail</p>
                        <input type="email" className="form-elem" placeholder='Ваша почта'/>
                        <span className="elem-error"></span>
                    </label>
                    <label className="form-box">
                        <p className="form-text" lang="ru">Пароль</p>
                        <input type="password" className="form-elem" placeholder='Введите пароль'/>
                        <span className="elem-error" lang="ru">Что-то пошло не так...</span>
                    </label>
                    <input type="submit" className="form-submit btn-blackout" value="Зарегистрироваться" />
                </form>
                <p className="auth-msg" lang="ru">Уже зарегистрированы?<Link to="/signin" className="auth-link link">Войти</Link></p>
            </section>
            }>
            </Route>

        </Routes>

    );
}

export default Register;
