import { useEffect, useState } from 'react';

import { useSelector } from '@redux/store';

export const useAuth = () => {
    const { user, loginLoading } = useSelector((state) => state.auth);

    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country?.name || undefined);
    const [sex, setSex] = useState(user?.sex || '');

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
            setAboutMe(user.aboutMe || '');
            setCity(user.city || '');
            setCountry(user.country?.name || undefined);
            setSex(user.sex || '');
        }
    }, [user]);

    return {
        username,
        email,
        aboutMe,
        city,
        country,
        sex,
        loginLoading,
    };
};
