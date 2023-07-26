import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './techs.css';

function Techs() {
    return (
        <Routes>
            <Route path="/" element={
                <section className="tech" id='tech'>
                    <div className="section-header tech__header">
                        <h2 className="section-title tech-title">Технологии</h2>
                    </div>
                    <h2 className="tech-subtitle">7 технологий</h2>
                    <p className="tech-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                    <ul className="tech-list">
                        <li className="tech-item">HTML</li>
                        <li className="tech-item">CSS</li>
                        <li className="tech-item">JS</li>
                        <li className="tech-item">React</li>
                        <li className="tech-item">Git</li>
                        <li className="tech-item">Express.js</li>
                        <li className="tech-item">mongoDB</li>
                    </ul>
                </section>
            }>
            </Route>
        </Routes>
    );
}

export default Techs;
