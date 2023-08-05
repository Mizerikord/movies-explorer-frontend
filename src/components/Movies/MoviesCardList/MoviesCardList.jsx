import React, { useEffect, useState, useRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import resize from '../../../utils/use-resize';

function MoviesCardList(props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    let [count, setCount] = useState(0);

    let rowEnd = useRef(false);

    let cards = props.cards;

    if (cards.length != 0) {
        rowEnd.current = true;
    }

    const arrayLength = cards.length;

    let { width, isScreenS, isScreenM, isScreenD } = resize();

    //Вывод количества карточек, в зависимости от ширины экрана + добавление строки
    function wiewCards(isScreenS, isScreenM, isScreenD) {
        if (isScreenS) {
            let a = 5;
            a += count * 1;
            return cards = cards.toSpliced(a, cards.length);
        } else if (isScreenM) {
            let b = 8;
            b += count * 2;
            return cards = cards.toSpliced(b, cards.length);
        } else if (isScreenD) {
            let c = 12;
            c += count * 3;
            return cards = cards.toSpliced(c, cards.length);
        }
    }

    useEffect(() => {
        wiewCards(isScreenS, isScreenM, isScreenD);
    }, [width]);

    //отрисовка карточек со счетчиком, для отключения кнопки "Еще"
    let rendercounter = 1;

    //каунтер для отрисовки рядов карточек при клике на "еще"
    function handleAddCards() {
        setCount(count + 1)
    }

    return (
        <section className="cards" aria-label="Кинопоиск">
            <ul className="cards__container">
                {wiewCards(isScreenS, isScreenM, isScreenD, arrayLength).map((elem) => {
                    if (rendercounter === props.cards.length) {
                        rowEnd.current = false;
                    }
                    rendercounter += 1;
                    return <MoviesCard card={elem} favourite={false} key={elem.movieId} onFavourite={props.onFavourite} isFavourite={props.isFavourite}/>
                })}
            </ul>
            {rowEnd.current && <button className="cards__add btn-blackout" onClick={handleAddCards}>Ещё</button>}
        </section>
    );
}

export default MoviesCardList;