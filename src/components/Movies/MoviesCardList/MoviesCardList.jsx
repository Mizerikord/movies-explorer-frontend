import React, { useEffect, useState, useRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import resize from '../../../utils/use-resize';
import constants from '../../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {

    let location = useLocation();

    // const [count, setCount] = useState(0);
    let count = props.count;

    let rowEnd = useRef(false);

    let cards = props.cards;

    if (cards.length != 0) {
        rowEnd.current = true;
    } else { rowEnd.current = false }

    const arrayLength = cards.length;

    let { width, isScreenS, isScreenM, isScreenD } = resize();

    //Вывод количества карточек, в зависимости от ширины экрана + добавление строки
    function wiewCards(isScreenS, isScreenM, isScreenD) {
        if (isScreenS) {
            let small = constants.maxCards_s;
            small += count * constants.add_sm;
            if (location.pathname === "/saved-movies") {
                return cards;
            }
            return cards = cards.toSpliced(small, cards.length);
        } else if (isScreenM) {
            let medium = constants.maxCards_m;
            medium += count * constants.add_sm;
            if (location.pathname === "/saved-movies") {
                return cards;
            }
            return cards = cards.toSpliced(medium, cards.length);
        } else if (isScreenD) {
            let desktop = constants.maxCards_d;
            desktop += count * constants.add_d;
            if (location.pathname === "/saved-movies") {
                return cards;
            }
            return cards = cards.toSpliced(desktop, cards.length);
        }
    }

    useEffect(() => {
        wiewCards(isScreenS, isScreenM, isScreenD);
    }, [width]);

    //отрисовка карточек со счетчиком, для отключения кнопки "Еще"
    let rendercounter = 1;

    //каунтер для отрисовки рядов карточек при клике на "еще"
    

    if (typeof props.cards === String) {
        return (
            <section className="cards" aria-label="Кинопоиск">
                <ul className="cards__container">
                    <p>{props.cards}</p>
                </ul>
            </section>
        );
    }
    function handleAddCards(){
        props.addCards();
    }

    return (
        <section className="cards" aria-label="Кинопоиск">
            <ul className="cards__container">
                {wiewCards(isScreenS, isScreenM, isScreenD, arrayLength).map((elem) => {
                    if (rendercounter === props.cards.length || props.parent != "movies") {
                        rowEnd.current = false;
                    }
                    rendercounter += 1;
                    return <MoviesCard card={elem} favourite={false} key={elem.movieId} onFavourite={props.onFavourite} isFavourite={props.isFavourite} />
                })}
            </ul>
            {rowEnd.current && <button className="cards__add btn-blackout" onClick={handleAddCards}>Ещё</button>}
        </section>
    );
}

export default MoviesCardList;