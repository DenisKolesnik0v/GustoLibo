import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { Button, Icon, Img, useTheme } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';

import { EditName } from '@components/EditName';
import { useAuth } from '@hooks/useAuth';
import { editProfile } from '@redux/actions/auth';

import cl from './Profile.module.scss';
import { EditingUserData } from '../../features/Profile/EditingUserData';
import { UserData } from '../../features/Profile/UserData';

export const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const { username } = useAuth();
    const [newUsername, setNewUsername] = useState(username);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditName, setIsEditName] = useState(false);
    const editNameRef = useRef<HTMLInputElement>(null);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const isMinWidth = windowSize.width < 500 && windowSize.width > 418;

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleOpenSettings = () => {
        setIsEditing(true);
    };

    const handleCloseSettings = () => {
        setIsEditing(false);
        setIsEditName(false);
    };

    const handleSaveNewUsername = (newusername: string) => {
        setNewUsername(newusername);
    };

    const handleIsEditName = () => {
        setIsEditName(true);
    };

    const handleDispatchNewName = () => {
        dispatch(editProfile({ username: newUsername }));
        setIsEditName(false);
    };

    return (
        <section className={classnames(cl.profile)}>
            <header className={classnames(cl['profile-header'])}>
                <div className={classnames(cl['user-data'])}>
                    <div className={classnames(cl['user-data-perv'])}>
                        <figure className={classnames(cl['user-img'])}>
                            <Img
                                src={'img/cat.jpg'}
                                alt={'Аватар пользователя'}
                                showLoader={false}
                            />
                        </figure>
                        <div className={classnames(cl['user-data-name'], cl[`user-data-name-theme-${theme}`])}>
                            {
                                isEditName
                                    ? (
                                        <EditName
                                            ref={editNameRef}
                                            username={newUsername}
                                            onSave={handleSaveNewUsername}
                                        />
                                    )
                                    : <strong>{username}</strong>
                            }
                            {
                                isEditing && (
                                    <Icon
                                        icon={isEditName ? 'check' : 'edit'}
                                        onClick={isEditName ? handleDispatchNewName : handleIsEditName}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <Button
                        text={isMinWidth ? '' : (isEditing ? 'Закрыть' : 'Настройки')}
                        icon={<Icon icon="settings" size="sm" />}
                        iconPosition='right'
                        size={isEditing ? 'md' : 'sm'}
                        onClick={isEditing ? handleCloseSettings : handleOpenSettings}

                    />
                </div>
            </header>
            <main className={classnames(cl['profile-body'], cl[`profile-body-theme-${theme}`])}>
                {isEditing ? <EditingUserData /> : <UserData />}
            </main>
        </section>
    );
};
