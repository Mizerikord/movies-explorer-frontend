import { useState, useEffect } from 'react';

const SCREEN_M = 763;
const SCREEN_D = 1200;

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
        isScreenS: width < SCREEN_M,
        isScreenM: SCREEN_M <= width && width < SCREEN_D,
        isScreenD: width >= SCREEN_D,
    }
};

export default useResize;