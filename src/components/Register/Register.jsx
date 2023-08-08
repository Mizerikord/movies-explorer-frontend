import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import './register.css';
import logo from '../../images/logo.svg';

function Register(props) {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: "onChange"
    });

    function handleFormSubmit(data) {
        props.onRegister({
            name: data.name,
            email: data.email,
            password: data.password
        });
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleFormSubmit(data);
    }

    return (
        <section className="auth" aria-label="Регистрация">
            <Link to="/" className="link"><img src={logo} alt="логотип" className="auth-icon" /></Link>
            <h2 className="auth-title" lang="ru">Добро пожаловать!</h2>
            <form action="" className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-box">
                    <p className="form-text" lang="ru">Имя</p>
                    <input
                        type="text" className="form-elem" placeholder='Ваше имя'
                        {...register("name", {
                            required: "Поле обязательно к заполнению",
                            pattern: {
                                value: /^[а-яА-ЯёЁa-zA-Z\-\ ]+$/,
                                message: "Поле может содержать только: латиницу, кириллицу, пробел или дефис"
                            },
                            minLength:{
                                value: 2,
                                message: "Имя должно быть от 2 до 30 символов"
                            },
                            maxLength:{
                                value: 30,
                                message: "Имя должно быть от 2 до 30 символов"
                            }
                        })}
                    />
                    <div className='elem-error-container'>{errors?.name && <span className="elem-error">{errors?.name?.message || "Error!"}</span>}</div>
                </label>
                <label className="form-box">
                    <p className="form-text" lang="en">E-mail</p>
                    <input
                        type="email" className="form-elem" placeholder='Ваша почта'
                        {...register("email", {
                            required: "Поле обязательно к заполнению",
                            pattern: {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-z]{2,4}$/,
                                message: "Некорректно введен адрес электронной почты"
                            }
                        })}
                    />
                    <div className='elem-error-container'>{errors?.email && <span className="elem-error">{errors?.email?.message || "Error!"}</span>}</div>
                </label>
                <label className="form-box">
                    <p className="form-text" lang="ru">Пароль</p>
                    <input
                        type="password" className="form-elem" placeholder='Введите пароль'
                        {...register("password", {
                            required: "Это поле обязательно к заполнению"
                        })}
                    />
                    <div className='elem-error-container'>{errors?.password && <span className="elem-error">{errors?.password?.message || "Error!"}</span>}</div>
                </label>
                <button type="submit" className={`btn-blackout ${isValid ? "form-submit" : "btn-register-disabled"}`} value="Зарегистрироваться" disabled={!isValid}>Зарегистрироваться</button>
            </form>
            <p className="auth-msg" lang="ru">Уже зарегистрированы?<Link to="/signin" className="auth-link link">Войти</Link></p>
        </section>
    );
}

export default Register;
