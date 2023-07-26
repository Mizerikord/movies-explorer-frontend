import React from 'react';
import { Link } from 'react-router-dom';
import './menupopup.css';
import close from '../../images/close-icon.svg'

function MenuPopup({ isOpen, onClose }) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <img src={close} alt="" className="popup__disable link" onClick={onClose} />
            <ul className="popup__link-container">
                <li className="popup-item" onClick={onClose}><Link to='/' className="popup-link">Главная</Link></li>
                <li className="popup-item" onClick={onClose}><Link to='/movies' className="popup-link">Фильмы</Link></li>
                <li className="popup-item" onClick={onClose}><Link to='/saved-movies' className="popup-link">Сохраненные фильмы</Link></li>
            </ul>
            <Link to='/profile' className="popup-btn link" >Аккаунт</Link>
        </div>
    )
};

export default MenuPopup;