import { IUser } from '../../utils/models/user';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SET_AUTH = 'SET_AUTH';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';
export const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';

export const setAuth = (isAuth: boolean) => ({
    type: SET_AUTH,
    payload: isAuth,
});

export const registerUser = (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}) => ({
    type: REGISTER_USER,
    payload: userData,
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
});

export const registerFailure = (error: string) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

export const loginUser = (userData: {
    email: string,
    password: string,
}) => ({
    type: LOGIN_USER,
    payload: userData,
});

export const loginSuccess = (user: IUser) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const validateToken = () => ({
    type: VALIDATE_TOKEN,
});

export const validateTokenSuccess = (user: IUser) => ({
    type: VALIDATE_TOKEN_SUCCESS,
    payload: user,
});

export const validateTokenFailure = () => ({
    type: VALIDATE_TOKEN_FAILURE,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string) => ({
    type: LOGOUT_FAILURE,
    payload: error,
});

export const editProfile = (data: IUser) => ({
    type: EDIT_PROFILE,
    payload: data,
});

export const editProfileSuccess = (user: { username: string; profile: any }) => ({
    type: EDIT_PROFILE_SUCCESS,
    payload: user,
});

export const editProfileFailure = (error: string) => ({
    type: EDIT_PROFILE_FAILURE,
    payload: error,
});
