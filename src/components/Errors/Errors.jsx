import { Route, Routes } from 'react-router-dom';
import './errors.css';

function Errors(props) {
    console.log("я сюда попал");

    function handleClick() {
        props.navigate(-1)
      }

    return (
        <Routes>
            <Route path="*" element={
                <div className="error-not-found">
                    <h2 className="error-name">404</h2>
                    <p className="error-text" lang="ru">Страница не найдена</p>
                    <button onClick={handleClick} className="error-link link">Назад</button>
                </div>
            }>
            </Route>
        </Routes>

    );
}

export default Errors;
