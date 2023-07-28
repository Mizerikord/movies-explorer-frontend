import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './login.css';
import logo from '../../images/logo.svg';

function Login(props) {

    return (
        <Routes>
            <Route path="/" element={
                <section className="auth" aria-label="Вход в приложение">
                <Link to="/" className="auth-icon link"><img src={logo} alt="логотип" /></Link>
                <h2 className="auth-title" lang="ru">Рады видеть!</h2>
                <form action="" className="auth-form" noValidate>
                    <label className="form-box">
                        <p className="form-text" lang="en">E-mail</p>
                        <input type="email" className="form-elem" placeholder='Ваша почта'/>
                        <span className="elem-error"></span>
                    </label>
                    <label className="form-box">
                        <p className="form-text" lang="ru">Пароль</p>
                        <input type="password" className="form-elem" placeholder='Ваш пароль'/>
                        <span className="elem-error"></span>
                    </label>
                    <input type="submit" className="form-submit-login btn-blackout" value="Войти" />
                </form>
                <p className="auth-msg" lang="ru">Еще не зарегистрированы?<Link to="/signup" className="auth-link link">Регистрация</Link></p>
            </section>
            }>
            </Route>

        </Routes>

    );
}

export default Login;
