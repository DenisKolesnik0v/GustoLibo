import { Input, Button } from 'orcalib-ui-kit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LogoutButton } from '@components/LogoutButton';
import { useAuth } from '@hooks/useAuth';
import { editProfile } from '@redux/actions/auth';

import cl from './UserSettings.module.scss';

interface FormData {
    email: string;
    sex: string;
    aboutMe: string;
    city: string;
}

export const UserSettings = () => {
    const dispatch = useDispatch();
    const { email, sex, aboutMe, city } = useAuth();

    type FormDataKeys = keyof FormData;

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingSex, setIsEditingSex] = useState(false);
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
    const [isEditingCity, setIsEditingCity] = useState(false);

    const [formData, setFormData] = useState({
        email: email || '',
        sex: sex || '',
        aboutMe: aboutMe || '',
        city: city || '',
    });

    const handleChange = (field: FormDataKeys) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = (field: FormDataKeys) => () => {
        dispatch(editProfile({ [field]: formData[field] }));
        switch (field) {
        case 'email':
            setIsEditingEmail(false);
            break;
        case 'sex':
            setIsEditingSex(false);
            break;
        case 'aboutMe':
            setIsEditingAboutMe(false);
            break;
        case 'city':
            setIsEditingCity(false);
            break;
        }
    };

    return (
        <React.Fragment>
            <div className={cl['editing-user-data__row']}>
                <div className={cl['editing-user-data__content']}>
                    <label className={cl['editing-user-data__label']}>Email:</label>
                    {isEditingEmail
                        ? (
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange('email')}

                            />
                        )
                        : (
                            <span className={cl['type-input']}>{formData.email || 'Здесь пока пусто'}</span>
                        )}
                </div>
                <div>
                    {isEditingEmail
                        ? (
                            <div className={cl['button-observ']}>
                                <Button
                                    text="Save"
                                    type="ghost"
                                    onClick={handleSave('email')}

                                />
                                <Button
                                    text="Close"
                                    type="ghost"
                                    onClick={() => setIsEditingEmail(false)}

                                />
                            </div>
                        )
                        : (
                            <Button
                                text="Edit"
                                type="ghost"
                                onClick={() => setIsEditingEmail(true)}

                            />
                        )}
                </div>
            </div>

            <div className={cl['editing-user-data__row']}>
                <div className={cl['editing-user-data__content']}>
                    <label className={cl['editing-user-data__label']}>Sex:</label>
                    {isEditingSex
                        ? (
                            <Input
                                type="text"
                                placeholder="Enter your sex"
                                value={formData.sex}
                                onChange={handleChange('sex')}

                            />
                        )
                        : (
                            <span className={cl['type-input']}>{formData.sex || 'Здесь пока пусто'}</span>
                        )}
                </div>
                <div>
                    {isEditingSex
                        ? (
                            <div className={cl['button-observ']}>
                                <Button
                                    text="Save"
                                    type="ghost"
                                    onClick={handleSave('sex')}

                                />
                                <Button
                                    text="Close"
                                    type="ghost"
                                    onClick={() => setIsEditingSex(false)}

                                />
                            </div>
                        )
                        : (
                            <Button
                                text="Edit"
                                type="ghost"
                                onClick={() => setIsEditingSex(true)}

                            />
                        )}
                </div>
            </div>

            <div className={cl['editing-user-data__row']}>
                <div className={cl['editing-user-data__content']}>
                    <label className={cl['editing-user-data__label']}>About Me:</label>
                    {isEditingAboutMe
                        ? (
                            <Input
                                type="text"
                                placeholder="Tell us about yourself"
                                value={formData.aboutMe}
                                onChange={handleChange('aboutMe')}

                                size="default"
                            />
                        )
                        : (
                            <span className={cl['type-input']}>{formData.aboutMe || 'Здесь пока пусто'}</span>
                        )}
                </div>
                <div>
                    {isEditingAboutMe
                        ? (
                            <div className={cl['button-observ']}>
                                <Button
                                    text="Save"
                                    type="ghost"
                                    onClick={handleSave('aboutMe')}

                                />
                                <Button
                                    text="Close"
                                    type="ghost"
                                    onClick={() => setIsEditingAboutMe(false)}

                                />
                            </div>
                        )
                        : (
                            <Button
                                text="Edit"
                                type="ghost"
                                onClick={() => setIsEditingAboutMe(true)}

                            />
                        )}
                </div>
            </div>

            <div className={cl['editing-user-data__row']}>
                <div className={cl['editing-user-data__content']}>
                    <label className={cl['editing-user-data__label']}>City:</label>
                    {isEditingCity
                        ? (
                            <Input
                                type="text"
                                placeholder="Enter your city"
                                value={formData.city}
                                onChange={handleChange('city')}

                                size="default"
                            />
                        )
                        : (
                            <span className={cl['type-input']}>{formData.city || 'Здесь пока пусто'}</span>
                        )}
                </div>
                <div>
                    {isEditingCity
                        ? (
                            <div className={cl['button-observ']}>
                                <Button
                                    text="Save"
                                    type="ghost"
                                    onClick={handleSave('city')}

                                />
                                <Button
                                    text="Close"
                                    type="ghost"
                                    onClick={() => setIsEditingCity(false)}

                                />
                            </div>
                        )
                        : (
                            <Button
                                text="Edit"
                                type="ghost"
                                onClick={() => setIsEditingCity(true)}

                            />
                        )}
                </div>
            </div>
            <div className={cl['logout-button']}>
                <LogoutButton />
            </div>
        </React.Fragment>
    );
};
