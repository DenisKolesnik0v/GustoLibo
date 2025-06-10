import React from 'react';
import classNames from 'classnames';

import { useAuth } from '@hooks/useAuth';

import cl from './UserProfile.module.scss';

interface ProfileFieldProps {
    label: string;
    value: string | undefined;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
    <div className={cl.field}>
        <span className={cl.label}>{label}:</span>
        <span className={cl.value}>{value || 'Не указано'}</span>
    </div>
);

export const UserProfile: React.FC = () => {
    const { email, sex, aboutMe, city } = useAuth();

    return (
        <div className={classNames(cl.profile)}>
            {aboutMe && (
                <div className={cl.about}>
                    <h3 className={cl.subtitle}>Обо мне</h3>
                    <p className={cl.description}>{aboutMe}</p>
                </div>
            )}
            <div className={cl.fields}>
                <ProfileField label="Email" value={email} />
                <ProfileField label="Пол" value={sex} />
                <ProfileField label="Город" value={city} />
            </div>
        </div>
    );
};
