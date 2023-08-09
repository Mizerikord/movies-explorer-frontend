import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './profile.css';
import MenuPopup from '../MenuPopup/MenuPopup';
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const {
        register,
        getValues,
        formState,
        formState: { errors, isValid },
        handleSubmit,
        clearErrors,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: currentUser.name,
            email: currentUser.email,
        }
    })

    function handleFormSubmit(data) {
        props.onEdit({
            name: data.name,
            email: data.email
        });
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleFormSubmit(data);
    }

    function checkDuplicate(inputName, inputEmail) {
        const { email, name } = currentUser;
        if (inputName === name && inputEmail === email) {
            return "Изменяемые данные должны отличаться от текущих"
        }
    }
    console.log(formState);

    useEffect(() => {
        formState.isValid && clearErrors(["name", "email"]);
    }, [formState.isValid])

    return (
        <>
            <section className="profile" aria-label="Профиль" onClick={props.onReset}>
                <h2 className="profile__title" lang="ru">Привет, {currentUser.name}!</h2>
                <form name="profile" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form__box underline">
                        <p className="input-name" lang="ru">Имя:</p>
                        <input
                            type="text" nme="name" className="form__elem form__elem_name" placeholder="Ваше имя"
                            {...register("name", {
                                required: "Поле обязательно к заполнению",
                                pattern: {
                                    value: /^[а-яА-ЯёЁa-zA-Z\-\ ]+$/,
                                    message: "Поле может содержать только: латиницу, кириллицу, пробел или дефис"
                                },
                                minLength: {
                                    value: 2,
                                    message: "Имя должно быть от 2 до 30 символов"
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Имя должно быть от 2 до 30 символов"
                                },
                                validate: (value) => {
                                    return checkDuplicate(value, getValues("email"));
                                }
                            })}
                        />
                    </label>
                    <div className='elem-error-profile'>{errors?.name && <span className="elem-error">{errors?.name?.message || ""}</span>}</div>
                    <label className="form__box">
                        <p className="input-name" lang="en">E-mail:</p>
                        <input type="email" ref="ref" name="email" className="form__elem form__elem_email" placeholder="Ваш e-mail"
                            {...register("email", {
                                required: "Поле обязательно к заполнению",
                                pattern: {
                                    value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                    message: "Некорректно введен адрес электронной почты"
                                },
                                validate: (value) => {
                                    return checkDuplicate(getValues("name"), value)
                                }
                            })}
                        />
                    </label>
                    <div className='elem-error-profile'>{errors?.email && <span className="elem-error">{errors?.email?.message || ""}</span>}</div>
                    <div className="profile-error-form">
                    </div >
                    <button className={`profile-submit ${isValid ? "" : "profile-invalid"}`} disabled={isValid ? false : true}>Редактировать</button>
                </form>
                <Link to="/" className="profile-link leave-link" onClick={props.onSignOut}>Выйти из аккаунта</Link>
            </section>
            <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
        </>
    );
}

export default Profile;
