import { IUser } from '../../utils/models/user';
import {
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    VALIDATE_TOKEN,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_FAILURE,
    LOGOUT_USER,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    EDIT_PROFILE,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from '../actions/auth';

type AuthState = {
    regLoading: boolean;
    regError: string | null;
    isRegistered: boolean;
    loginLoading: boolean;
    loginError: string | null;
    isLoggedIn: boolean;
    isAuth: boolean;
    user: IUser | null;
    logoutLoading: boolean;
    logoutError: string | null;
    editProfileLoading: boolean;
    editProfileError: string | null;
};

const initialState: AuthState = {
    regLoading: false,
    regError: null,
    isRegistered: false,
    loginLoading: false,
    loginError: null,
    isLoggedIn: false,
    isAuth: false,
    user: null,
    logoutLoading: false,
    logoutError: null,
    editProfileLoading: false,
    editProfileError: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                regLoading: true,
                regError: null,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                regLoading: false,
                isRegistered: true,
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                regLoading: false,
                regError: action.payload,
            };

        case LOGIN_USER:
            return {
                ...state,
                loginLoading: true,
                loginError: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                isLoggedIn: true,
                isAuth: true,
                user: action.payload.user,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginError: action.payload,
            };

        case VALIDATE_TOKEN:
            return {
                ...state,
                isAuth: false,
            };

        case VALIDATE_TOKEN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isLoggedIn: true,
                user: action.payload,
            };

        case VALIDATE_TOKEN_FAILURE:
            return {
                ...state,
                isAuth: false,
                isLoggedIn: false,
            };

        case LOGOUT:
        case LOGOUT_USER:
            return {
                ...state,
                logoutLoading: true,
                logoutError: null,
            };

        case LOGOUT_SUCCESS:
            return {
                ...initialState,
                isRegistered: state.isRegistered,
                isAuth: false,
            };

        case LOGOUT_FAILURE:
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.payload,
            };

        case EDIT_PROFILE:
            return {
                ...state,
                editProfileLoading: true,
                editProfileError: null
            };

        case EDIT_PROFILE_SUCCESS:
            if (!action.payload) {
                return state;
            }

            return {
                ...state,
                editProfileLoading: false,
                user: {
                    ...(state.user || {}),
                    ...action.payload,
                    email: action.payload.email ?? state.user?.email,
                    sex: action.payload.sex ?? state.user?.sex,
                    aboutMe: action.payload.aboutMe ?? state.user?.aboutMe,
                    city: action.payload.city ?? state.user?.city,
                }
            };

        case EDIT_PROFILE_FAILURE:
            return {
                ...state,
                editProfileLoading: false,
                editProfileError: action.payload
            };

        default:
            return state;
    }
};
