import React from 'react';
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import './aboutme.css';
import Portfolio from '../Portfolio/Portfolio.jsx';

function AboutMe() {
    return (
        <Routes>
            <Route path="/" element={
                <section className="student" id='student'>
                    <div className="section-header student__header">
                        <h2 className="section-title student-title">Студент</h2>
                    </div>
                    <div className="student__info-container">
                        <div className="student-info">
                            <h3 className="student-header">Сергей</h3>
                            <h4 className="student-about">Студент факультета Веб-разработки, 33 года.</h4>
                            <p className="student-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea earum ratione,
                                nihil dolores consectetur quasi expedita qui nisi voluptate atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea earum ratione,
                                nihil dolores consectetur quasi expedita qui nisi voluptate atque.</p>
                            <Link href="#" className="git-link">Github</Link>
                        </div>
                        <img src="" alt="" className="student-foto" />
                    </div>
                    <Portfolio />
                </section>
            }>
            </Route>
        </Routes>
    );
}

export default AboutMe;
