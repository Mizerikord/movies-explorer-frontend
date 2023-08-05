import { Link } from "react-router-dom";
import './profile.css';
import MenuPopup from '../MenuPopup/MenuPopup';
import { useForm } from "react-hook-form";

function Profile(props) {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });



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

    return (
        <>
            <section className="profile" aria-label="Профиль" onClick={props.onReset}>
                <h2 className="profile__title" lang="ru">Привет, Виталий!</h2>
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
                                }
                            })}
                        />
                    </label>
                    <div>{errors?.name && <span className="elem-error">{errors?.name?.message || "Error!"}</span>}</div>
                    <label className="form__box">
                        <p className="input-name" lang="en">E-mail:</p>
                        <input type="email" name="email" className="form__elem form__elem_email" placeholder="Ваш e-mail"
                            {...register("email", {
                                required: "Поле обязательно к заполнению",
                                pattern: {
                                    value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                    message: "Некорректно введен адрес электронной почты"
                                }
                            })}
                        />
                    </label>
                    <div>{errors?.email && <span className="elem-error">{errors?.email?.message || "Error!"}</span>}</div>
                    <div className="profile-error-form">
                        {props.message && <span className="error-message">{props.message}</span>}
                    </div>
                    <button className="profile-submit" disabled={isValid ? false : true}>Редактировать</button>
                </form>
                <Link to="/" className="profile-link leave-link" onClick={props.onSignOut}>Выйти из аккаунта</Link>
            </section>
            <MenuPopup isOpen={props.isOpen} onClose={props.onClose} />
        </>
    );
}

export default Profile;
