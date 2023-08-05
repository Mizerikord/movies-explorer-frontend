import React from 'react';
import { Link } from 'react-router-dom';
import './aboutme.css';
import Portfolio from '../Portfolio/Portfolio.jsx';
import mephoto from '../../../images/me-photo.jpg';

function AboutMe() {
    return (
        <section className="student" id='student' aria-label="О студенте">
            <div className="section-header student__header">
                <h2 className="section-title student-title" lang="ru">Студент</h2>
            </div>
            <div className="student__info-container">
                <div className="student-info">
                    <h3 className="student-header" lang="ru">Сергей</h3>
                    <p className="student-about" lang="ru">Студент факультета Веб-разработки, 33 года.</p>
                    <p className="student-text" lang="en">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea earum ratione,
                        nihil dolores consectetur quasi expedita qui nisi voluptate atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea earum ratione,
                        nihil dolores consectetur quasi expedita qui nisi voluptate atque.</p>
                    <Link href="#" className="git-link">Github</Link>
                </div>
                <img src={mephoto} alt="" className="student-photo" />
            </div>
            <Portfolio />
        </section>
    );
}

export default AboutMe;
