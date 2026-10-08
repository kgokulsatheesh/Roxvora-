import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — scrolls the window to the top on every route change.
 * Renders nothing; drop it anywhere inside a Router.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
