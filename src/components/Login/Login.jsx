import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './login.css';
import logo from '../../images/logo.svg';

function Login(props) {

    return (
        <Routes>
            <Route path="/" element={
                <section className="register">
                <Link to="/" className="auth-icon link"><img src={logo} alt="логотип" /></Link>
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
                    <input type="submit" className="form-submit btn-blackout" value="Войти" />
                </form>
                <p className="register-msg">Еще не зарегистрированы?<Link to="/signup" className="register-link link">Зарегистрироваться</Link></p>
            </section>
            }>
            </Route>

        </Routes>

    );
}

export default Login;
