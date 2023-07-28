import React from 'react';
import { Routes, Route } from 'react-router-dom';

function FilterCheckbox() {

    return (
        <div className="change-box">
            <label className="switch">
                <input type="checkbox" id="" className="checkbox"  />
                <span className="slider round"></span>
            </label>
            <p className="search-change-text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;