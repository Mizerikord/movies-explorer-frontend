import React from 'react'
import './preloader.css'

function Preloader(props) {

    const waiting = (`preloader ${props.isLoading && 'preloader_disactive'}`)

    if (props.message != "") {
        return (
            <div className={waiting}>
                <div className="preloader__container-msg" onClick={props.onReset}>
                    <span className="preloader__not-found">{props.message}</span>
                </div>
            </div>
        )
    }

    return (
        <div className={waiting}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
