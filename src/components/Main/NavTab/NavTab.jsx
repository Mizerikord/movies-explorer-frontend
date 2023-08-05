
import { Link } from "react-router-dom";
import './navtab.css';

function NavTab(props) {
    return (
        <ul className="nav-list">
            <li className="nav-item link"><Link to='/#about' className="nav-link">О проекте</Link></li>
            <li className="nav-item link"><Link to='/#tech' className="nav-link">Технологии</Link></li>
            <li className="nav-item link"><Link to='/#student' className="nav-link">Студент</Link></li>
        </ul>
    );
}

export default NavTab;
