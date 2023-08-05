import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './login.css';
import logo from '../../images/logo.svg';
import { useForm } from "react-hook-form";

function Login(props) {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    function handleFormSubmit(data) {
        props.onLogin({
            email: data.email,
            password: data.password
        });
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleFormSubmit(data);
    }


    return (
        <section className="auth" aria-label="Вход в приложение">
            <Link to="/" className="auth-icon link"><img src={logo} alt="логотип" /></Link>
            <h2 className="auth-title" lang="ru">Рады видеть!</h2>
            <form action="#" className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-box">
                    <p className="form-text" lang="en">E-mail</p>
                    <input
                        type="email" className="form-elem" placeholder='Ваша почта'
                        {...register("email", {
                            required: "Поле обязательно к заполнению",
                            pattern: {
                                value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                message: "Некорректно введен адрес электронной почты"
                            }
                        })}
                    />
                    <div className='elem-error-container'>{errors?.email && <span className="elem-error">{errors?.email?.message || "Error!"}</span>}</div>
                </label>
                <label className="form-box">
                    <p className="form-text" lang="ru">Пароль</p>
                    <input type="password" className="form-elem" placeholder='Ваш пароль'
                        {...register("password", {
                            required: "Это поле обязательно к заполнению"
                        })}
                    />
                    <div className='elem-error-container'>{errors?.password && <span className="elem-error">{errors?.password?.message || "Error!"}</span>}</div>
                </label>
                <button type="submit" className={`btn-blackout ${isValid ? "form-submit-login" : "btn-login-disabled"}`} value="Войти" disabled={!isValid}>Войти</button>
            </form>
            <p className="auth-msg" lang="ru">Еще не зарегистрированы?<Link to="/signup" className="auth-link link">Регистрация</Link></p>
        </section>
    );
}

export default Login;
