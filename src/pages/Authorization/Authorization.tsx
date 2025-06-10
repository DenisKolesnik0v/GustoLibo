import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Modal } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';

import { useSelector } from '@redux/store';

import cl from './Authorization.module.scss';
import { validateAuthFields } from '../../utils/validateFields';
import { registerUser, loginUser } from '../../redux/actions/auth';

interface AuthorizationProps {
    opened: boolean;
    setClose: () => void;
}

export const Authorization: React.FC<AuthorizationProps> = ({
    opened,
    setClose,
}) => {
    const dispatch = useDispatch();
    const [curContext, setCurContext] = useState<'login' | 'registration'>('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptPassword, setAcceptPassword] = useState('');

    const [errors, setErrors] = useState<{
        emptyFields: boolean;
        passwordMismatch: boolean;
    }>({
        emptyFields: false,
        passwordMismatch: false,
    });

    const {
        regLoading,
        loginLoading,
        regError,
        loginError,
        isLoggedIn,
    } = useSelector((state) => state.auth);

    const loading = regLoading || loginLoading;
    const error = regError || loginError;

    useEffect(() => {
        if (isLoggedIn) {
            handleClose();
        }
    }, [isLoggedIn]);

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleAcceptPasswordChange = (value: string) => {
        setAcceptPassword(value);
    };

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    };

    const handleSubmit = () => {
        const validationResults = validateAuthFields(
            email,
            password,
            curContext === 'registration' ? acceptPassword : undefined,
        );

        setErrors(validationResults);

        if (!validationResults.emptyFields && !validationResults.passwordMismatch) {
            if (curContext === 'registration') {
                dispatch(registerUser({ username, email, password, confirmPassword: acceptPassword }));
            } else {
                dispatch(loginUser({ email, password }));
            }
        }

        if (curContext === 'registration') {
            setCurContext('login');
            handleClearInputs();
        }
    };

    const handleClose = () => {
        handleClearInputs();
        setErrors({ emptyFields: false, passwordMismatch: false });
        setClose();
    };

    const handleClearInputs = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setAcceptPassword('');
        setCurContext('login');
    };

    return (
        <Modal
            onClose={handleClose}
            onBackgroundClick={handleClose}
            isVisible={opened}
            title={curContext === 'login' ? 'Вход' : 'Регистрация'}
            subtitle={
                curContext === 'login'
                    ? (
                        <div
                            role="presentation"
                            className={cl['auth-link-to']}
                            onClick={() => setCurContext('registration')}
                        >
                            Нет аккаунта? Зарегистрируйтесь!
                        </div>
                    )
                    : (
                        <div
                            role="presentation"
                            className={cl['auth-link-to']}
                            onClick={() => setCurContext('login')}
                        >
                            Уже есть аккаунт? Войдите!
                        </div>
                    )
            }
            backgroundImg="img/authbg.jpg"

        >
            <div className={cl['error-label']}>
                {(errors.emptyFields || errors.passwordMismatch || error) && <Icon icon="warning-hex" />}
                {errors.emptyFields && <p style={{ paddingTop: '2px' }}>Поля не должны быть пустыми</p>}
                {errors.passwordMismatch && <p style={{ paddingTop: '2px' }}>Пароли должны совпадать</p>}
                {error && <p style={{ paddingTop: '2px', color: 'red' }}>{error}</p>}
            </div>

            <div className={cl['auth-element']}>
                {
                    curContext === 'registration' && (
                        <Input
                            type="text"
                            label="Имя пользователя"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Введите имя пользователя"

                        />
                    )
                }
                <Input
                    type="email"
                    label="Почта"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Введите ваш email"

                />
                <Input
                    type="password"
                    label="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Введите пароль"

                />
                {
                    curContext === 'registration' && (
                        <Input
                            type="password"
                            label="Повторите пароль"
                            value={acceptPassword}
                            onChange={handleAcceptPasswordChange}
                            placeholder="Введите пароль ещё раз"

                        />
                    )
                }
                <Button
                    text={curContext === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    onClick={handleSubmit}

                    disabled={loading}
                />
            </div>
        </Modal>
    );
};
