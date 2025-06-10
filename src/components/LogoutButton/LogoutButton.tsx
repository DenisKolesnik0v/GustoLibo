import { useDispatch } from 'react-redux';
import { Button, Icon } from 'orcalib-ui-kit';
import { useNavigate } from 'react-router-dom';

import cl from './Logout.module.scss';
import { logoutUser, validateToken } from '../../redux/actions/auth';

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(validateToken());
        navigate('/');
    };

    return (
        <Button
            text="Выйти"
            icon={<Icon icon='logout' className={cl.mirror} />}
            iconPosition="right"
            onClick={handleLogout}
            size="sm"

        />
    );
};
