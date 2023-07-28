import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './navtab.css';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function NavTab(props) {
    return (
        <Routes>
            <Route path="/" element={
                <ul className="nav-list">
                    <li className="nav-item link"><Link to='/#about' className="nav-link">О проекте</Link></li>
                    <li className="nav-item link"><Link to='/#tech' className="nav-link">Технологии</Link></li>
                    <li className="nav-item link"><Link to='/#student' className="nav-link">Студент</Link></li>
                </ul>
            }>
            </Route>
        </Routes>

    );
}

export default NavTab;
