import {
    ICategory,
    FETCH_ALL_CATEGORIES_REQUEST,
    FETCH_ALL_CATEGORIES_SUCCESS,
    FETCH_ALL_CATEGORIES_FAILURE,
    ALL_RECIPES,
    ALL_RECIPES_SUCCESS,
    ALL_RECIPES_FAILURE,
    FETCH_RECIPE_BY_ID,
    FETCH_RECIPE_BY_ID_FAILURE,
    FETCH_RECIPE_BY_ID_SUCCESS,
    FETCH_RECIPES_BY_REGION,
    FETCH_RECIPES_BY_REGION_FAILURE,
    FETCH_RECIPES_BY_REGION_SUCCESS,
    FETCH_RECIPES_BY_COUNTRY,
    FETCH_RECIPES_BY_COUNTRY_FAILURE,
    FETCH_RECIPES_BY_COUNTRY_SUCCESS,
    FETCH_RECIPES_BY_CATEGORY,
    FETCH_RECIPES_BY_CATEGORY_SUCCESS,
    FETCH_RECIPES_BY_CATEGORY_FAILURE,
    SEARCH_RECIPES_FAILURE,
    SEARCH_RECIPES_REQUEST,
    SEARCH_RECIPES_SUCCESS,
} from "@redux/actions/categories";
import { IRecipe } from "@utils/models/recipe";

interface initialType {
    categories: ICategory[],
    loading: boolean,
    loadingRecipeById: boolean,
    error: string | null,
    recipes: IRecipe[],
    recipe: IRecipe | null,
    regionRecipes: IRecipe[],
    countryRecipes: IRecipe[],
    categoryRecipes: IRecipe[],
    searchResults: IRecipe[],
    searchLoading: boolean,
    searchError: string | null,
}

const initialState: initialType = {
    categories: [],
    loading: false,
    loadingRecipeById: false,
    error: null,
    recipes: [],
    recipe: null,
    regionRecipes: [],
    countryRecipes: [],
    categoryRecipes: [],
    searchResults: [],
    searchLoading: false,
    searchError: null,
};

export function categoryReducer(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES_REQUEST:
            return { ...state, loading: true };
        case FETCH_ALL_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case FETCH_ALL_CATEGORIES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ALL_RECIPES:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ALL_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: action.payload,
            };
        case ALL_RECIPES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case FETCH_RECIPE_BY_ID:
            return { ...state, loadingRecipeById: true, error: null };
        case FETCH_RECIPE_BY_ID_SUCCESS:
            return { ...state, loadingRecipeById: false, recipe: action.payload };
        case FETCH_RECIPE_BY_ID_FAILURE:
            return { ...state, loadingRecipeById: false, error: action.payload };

        case FETCH_RECIPES_BY_REGION:
            return { ...state, loading: true, error: null };
        case FETCH_RECIPES_BY_REGION_SUCCESS:
            return { ...state, loading: false, regionRecipes: action.payload };
        case FETCH_RECIPES_BY_REGION_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_RECIPES_BY_COUNTRY:
            return { ...state, loading: true, error: null };
        case FETCH_RECIPES_BY_COUNTRY_SUCCESS:
            return { ...state, loading: false, countryRecipes: action.payload };
        case FETCH_RECIPES_BY_COUNTRY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_RECIPES_BY_CATEGORY:
            return { ...state, loading: true, error: null };
        case FETCH_RECIPES_BY_CATEGORY_SUCCESS:
            return { ...state, loading: false, categoryRecipes: action.payload };
        case FETCH_RECIPES_BY_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SEARCH_RECIPES_REQUEST:
            return {
                ...state,
                searchLoading: true,
                searchError: null,
            };
        case SEARCH_RECIPES_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchResults: action.payload,
                searchError: null,
            };
        case SEARCH_RECIPES_FAILURE:
            return {
                ...state,
                searchLoading: false,
                searchResults: [],
                searchError: action.payload,
            };

        case 'RESET_RECIPES':
            return { ...state, regionRecipes: [], countryRecipes: [] };

        default:
            return state;
    };
};
