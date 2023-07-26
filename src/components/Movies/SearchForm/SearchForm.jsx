import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {

    return (
        <section className="search">
            <div className="search__area">
                <div className="search-box">
                    <input type="text" className="search-elem" placeholder="Фильм"/>
                    <input type="submit" className="search-sbmt btn-blackout" value=''/>
                </div>
                <FilterCheckbox />
            </div>
            <div className="search__void"></div>
        </section>
    );
}

export default SearchForm;