import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAILURE,
    FETCH_COUNTRY_BY_NAME_REQUEST,
    FETCH_COUNTRY_BY_NAME_SUCCESS,
    FETCH_COUNTRY_BY_NAME_FAILURE,
    FETCH_REGIONS_REQUEST,
    FETCH_REGIONS_SUCCESS,
    FETCH_REGIONS_FAILURE,
    FETCH_REGION_BY_NAME_REQUEST,
    FETCH_REGION_BY_NAME_SUCCESS,
    FETCH_REGION_BY_NAME_FAILURE,
    FETCH_COUNTRIES_BY_REGION_REQUEST,
    FETCH_COUNTRIES_BY_REGION_SUCCESS,
    FETCH_COUNTRIES_BY_REGION_FAILURE,
    SET_QUERY,
} from '../actions/extras';

const initialState = {
    countries: [],
    country: null,
    regions: [],
    countriesByRegion: [],
    region: null,
    loading: false,
    error: null,
    fastQuery: '',
};

export const extrasReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_COUNTRIES_REQUEST:
            return { ...state, loading: true };
        case FETCH_COUNTRIES_SUCCESS:
            return { ...state, loading: false, countries: action.payload };
        case FETCH_COUNTRIES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_COUNTRY_BY_NAME_REQUEST:
            return { ...state, loading: true };
        case FETCH_COUNTRY_BY_NAME_SUCCESS:
            return { ...state, loading: false, country: action.payload };
        case FETCH_COUNTRY_BY_NAME_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_REGIONS_REQUEST:
            return { ...state, loading: true };
        case FETCH_REGIONS_SUCCESS:
            return { ...state, loading: false, regions: action.payload };
        case FETCH_REGIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_REGION_BY_NAME_REQUEST:
            return { ...state, loading: true };
        case FETCH_REGION_BY_NAME_SUCCESS:
            return { ...state, loading: false, region: action.payload };
        case FETCH_REGION_BY_NAME_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_COUNTRIES_BY_REGION_REQUEST:
            return { ...state, loading: true };
        case FETCH_COUNTRIES_BY_REGION_SUCCESS:
            return { ...state, loading: false, countriesByRegion: action.payload };
        case FETCH_COUNTRIES_BY_REGION_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SET_QUERY:
            return { ...state, fastQuery: action.payload };

        default:
            return state;
    }
};
