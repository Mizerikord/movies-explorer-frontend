import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './footer.css';

function Footer(props) {

    return (
        <Routes>
            <Route path="*" element={
                <footer className="footer">
                <h2 className="footer__title" lang="ru">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className="footer__copy">
                    <p className="year">&copy; 2023</p>
                    <div className="copyright">
                        <p className="autor" lang="ru">CCC</p>
                        <Link to={'https://github.com/Mizerikord/movies-explorer-frontend'} className="author-link link">Github</Link>
                    </div>
                </div>
            </footer>
            }>
            </Route>

        </Routes>

    );
}

export default Footer;
