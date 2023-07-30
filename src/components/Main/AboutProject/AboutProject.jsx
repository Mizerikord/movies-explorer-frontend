import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './aboutproject.css';


function AboutProject(props) {
    return (
        <Routes>
            <Route path="/" element={
                <section className="about" id='about' aria-label="О проекте">
                <div className="section-header about__header">
                    <h2 className="section-title about-title" lang="ru">О проекте</h2>
                </div>
                <ul className="project-list">
                    <li className="project-item">
                        <h3 className="project-subtitle" lang="ru">Дипломный проект включал 5 этапов</h3>
                        <p className="project-text" lang="ru">Составление плана, работу над бэкендом, вёрстку, добавление функциональности
                            и финальные доработки.</p>
                    </li>
                    <li className="project-item">
                        <h3 className="project-subtitle" lang="ru">На выполнение диплома ушло 5 недель</h3>
                        <p className="project-text" lang="ru">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
                            чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className="project-line-container">
                    <div className="project-line">
                        <div className="timeline timeline_blue" lang="ru">1 неделя</div>
                        <div className="timeline timeline_grey" lang="ru">4 недели</div>
                    </div>
                    <div className="project-line">
                        <p className="signature" lang="en">Back-end</p>
                        <p className="signature" lang="en">Front-end</p>
                    </div>
                </div>
            </section>
            }>
            </Route>
        </Routes>
    );
}

export default AboutProject;
