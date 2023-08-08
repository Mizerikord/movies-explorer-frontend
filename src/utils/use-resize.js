import { useState, useEffect } from 'react';
import constants from './constants.js';

function useResize() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return {
        width,
        isScreenS: width < constants.SCREEN_M,
        isScreenM: constants.SCREEN_M <= width && width < constants.SCREEN_D,
        isScreenD: width >= constants.SCREEN_D,
    }
};

export default useResize;