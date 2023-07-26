import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './promo.css';
import NavTab from '../NavTab/NavTab.jsx'

function Promo(props) {

    return (
        <Routes>
            <Route path="/" element={
                <section className="title-box">
                    <h1 className="title">Учебный проект студента факультета Веб-разработки.</h1>
                    <NavTab handleClick = {props.handleClick}/>
                </section>
            }>
            </Route>

        </Routes>

    );
}

export default Promo;
