import {
    FETCH_CATEGORIES_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    ADD_RECIPE_SUCCESS,
    REMOVE_RECIPE_SUCCESS,
    FETCH_RECIPES_BY_IDS_FAILURE,
    FETCH_RECIPES_BY_IDS_REQUEST,
    FETCH_RECIPES_BY_IDS_SUCCESS
} from '../actions/user-category';

const initialState = {
    categories: [] as any[],
    loading: false,
    error: null as string | null,
    recipes: [],
    loadingRec: false,
    errorRec: '',
};

export function userCategoryReducer(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: action.payload };

        case CREATE_CATEGORY_SUCCESS:
            return { ...state, categories: [action.payload, ...state.categories] };

        case DELETE_CATEGORY_SUCCESS:
            return { ...state, categories: state.categories.filter(c => c._id !== action.payload) };

        case ADD_RECIPE_SUCCESS:
        case REMOVE_RECIPE_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(cat =>
                    cat._id === action.payload._id ? action.payload : cat
                )
            };
        case FETCH_RECIPES_BY_IDS_REQUEST:
            return {
                ...state,
                loadingRec: true,
                errorRec: '',
            };
        case FETCH_RECIPES_BY_IDS_SUCCESS:
            return {
                ...state,
                loadingRec: false,
                recipes: action.payload,
            };
        case FETCH_RECIPES_BY_IDS_FAILURE:
            return {
                ...state,
                loadingRec: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
