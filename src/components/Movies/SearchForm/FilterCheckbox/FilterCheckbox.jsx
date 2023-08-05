import React from 'react';

function FilterCheckbox(props) {

    return (
        <div className="change-box">
            <label className="switch">
                <input type="checkbox" className="checkbox" checked={props.check} onChange={props.onCheck}/>
                <span className="slider round"></span>
            </label>
            <p className="search-change-text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;