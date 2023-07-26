import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import './errors.css';

function Errors(props) {

    return (
        <Routes>
            <Route path="*" element={
                <div className="error-not-found">
                    <h2 className="error-name">404</h2>
                    <p className="error-text">Страница не найдена</p>
                    <Link href="#" className="error-link">Назад</Link>
                </div>
            }>
            </Route>
        </Routes>

    );
}

export default Errors;
