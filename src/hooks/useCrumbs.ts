import { useLocation } from 'react-router-dom';

const useCrumbs = () => {
    const location = useLocation();

    const getCrumbs = () => {
        const path = location.pathname.replace(/^\/|\/$/g, '');
        const crumbs = path ? path.split('/') : [];
        return crumbs.slice(0, -1);
    };

    return getCrumbs();
};

export default useCrumbs;
