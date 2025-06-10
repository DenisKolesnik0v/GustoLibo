import { call, put, takeEvery } from 'redux-saga/effects';
import { useNavigate } from 'react-router-dom';

import {
    REGISTER_USER,
    registerSuccess,
    registerFailure,
    LOGIN_USER,
    loginFailure,
    loginSuccess,
    setAuth,
    validateTokenFailure,
    validateTokenSuccess,
    VALIDATE_TOKEN,
    logoutFailure,
    logoutSuccess,
    LOGOUT_USER,
    editProfileFailure,
    editProfileSuccess,
    EDIT_PROFILE,
    validateToken,
} from '../actions/auth';
import apiClient from '../../utils/apiClient';
import { IUser } from '../../utils/models/user';

function * registerUserSaga (action: { type: string; payload: any }): Generator<any, void, any> {
    try {
        const response: { message: string } = yield call(apiClient.post, '/auth/registration', action.payload);

        if (response) {
            yield put(registerSuccess());
        }
    } catch (error: any) {
        yield put(registerFailure(error.message || 'Registration failed'));
    }
}

function * loginUserSaga (action: { type: string; payload: any }): Generator<any, void, any> {
    try {
        const response: { accessToken: string; user: IUser } = yield call(apiClient.post, '/auth/login', action.payload);

        if (response && response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);

            yield put(setAuth(true));
            yield put(loginSuccess(response.user));
        }
    } catch (error: any) {
        yield put(loginFailure(error.message || 'Login failed'));
    }
}

function * validateTokenSaga () {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            yield put(validateTokenFailure());
            return;
        }

        const response: { accessToken: string, user: IUser } = yield call(
            apiClient.get,
            '/auth/validate-token',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        localStorage.setItem('accessToken', response.accessToken);

        if (response) {
            yield put(validateTokenSuccess(response.user));
        } else {
            yield put(validateTokenFailure());
        }
    } catch (error: any) {
        yield put(validateTokenFailure());
    }
}

function * logoutSaga () {
    try {
        const navigate = useNavigate();
        yield call(apiClient.get, '/auth/logout');

        localStorage.removeItem('accessToken');

        yield put(logoutSuccess());
        navigate('/');
    } catch (error: any) {
        localStorage.removeItem('accessToken');
        yield put(logoutFailure(error.message || 'Logout failed'));
    }
}

function* editProfileSaga(action: { type: string; payload: any }) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            yield put(editProfileFailure('Токен отсутствует'));
            return;
        }

        const response: { username: string; profile: any } = yield call(apiClient.post, '/profile/edit-profile', action.payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        yield put(editProfileSuccess(response));
        yield put(validateToken());
    } catch (error: any) {
        yield put(editProfileFailure(error.message || 'Ошибка обновления профиля'));
    }   
}

export function * authSaga (): Generator<any, void, any> {
    yield takeEvery(REGISTER_USER, registerUserSaga);
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(VALIDATE_TOKEN, validateTokenSaga);
    yield takeEvery(LOGOUT_USER, logoutSaga);
    yield takeEvery(EDIT_PROFILE, editProfileSaga);
}
