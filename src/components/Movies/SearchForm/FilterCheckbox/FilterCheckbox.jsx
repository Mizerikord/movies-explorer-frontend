import React from 'react';

function FilterCheckbox(props) {

    function saveCheckedPosition(){
        console.log(props.check);
        props.onCheck();
    }

    return (
        <div className="change-box">
            <label className="switch">
                <input type="checkbox" className="checkbox" checked={props.check} onChange={saveCheckedPosition}/>
                <span className="slider round"></span>
            </label>
            <p className="search-change-text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;