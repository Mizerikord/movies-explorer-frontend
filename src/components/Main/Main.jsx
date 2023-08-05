import React from 'react';
import './main.css';
import AboutProject from './AboutProject/AboutProject.jsx';
import AboutMe from './AboutMe/AboutMe.jsx';
import Tech from './Techs/Techs.jsx';
import Promo from './Promo/Promo';



function Main(props) {

    return (
        <>
            <main className='main'>
                <Promo />
                <AboutProject />
                <Tech />
                <AboutMe />
            </main>
        </>
    );
}

export default Main;
