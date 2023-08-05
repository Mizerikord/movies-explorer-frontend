import './promo.css';
import NavTab from '../NavTab/NavTab.jsx'

function Promo(props) {

    return (
        <section className="title-box">
            <h1 className="title" lang="ru">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab handleClick={props.handleClick} />
        </section>
    );
}

export default Promo;
