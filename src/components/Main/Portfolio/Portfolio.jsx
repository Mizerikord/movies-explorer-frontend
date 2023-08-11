import React from 'react';
import { Link } from 'react-router-dom';
import './portfolio.css';
import arrow from '../../../images/student-link-icon.svg'


function Portfolio() {
    return (
        <div className="student__portfolio">
            <h3 className="portfolio-header">Портфолио</h3>
            <ul className="student-links">
                <li className="student-item">
                    <Link to="https://github.com/Mizerikord/how-to-learn" target='_blanc' className='work-link'>
                        <p className="link-text">Статичный сайт</p>
                        <img src={arrow} alt="ссылка на Статичный сайт" className="link-icon link" />
                    </Link>
                </li>
                <li className="student-item">
                    <Link to="https://github.com/Mizerikord/russian-travel" target='_blanc' className='work-link'>
                        <p className="link-text">Адаптивный сайт</p>
                        <img src={arrow} alt="ссылка на Адаптивный сайт" className="link-icon link" />
                    </Link>
                </li>
                <li className="student-item">
                    <Link to="https://sss.student.nomoredomains.rocks/signin" target='_blanc' className='work-link'>
                        <p className="link-text">Одностраничное приложение</p>
                        <img src={arrow} alt="ссылка на Одностраничное приложение" className="link-icon link" />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Portfolio;
