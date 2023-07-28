import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {

    return (
        <section className="search" aria-label="Поиск">
            <div className="search__area">
                <form name="search" className="search-box" noValidate>
                    <input type="text" className="search-elem" placeholder="Фильм"/>
                    <button type="submit" className="search-sbmt btn-blackout" value=''/>
                </form>
                <FilterCheckbox />
            </div>
            <div className="search__void"></div>
        </section>
    );
}

export default SearchForm;