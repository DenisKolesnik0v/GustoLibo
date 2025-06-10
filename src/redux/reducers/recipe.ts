import { IRecipe } from '@utils/models/recipe';
import {
    CREATE_RECIPE_REQUEST,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAILURE,
    GET_USER_RECIPES_REQUEST,
    GET_USER_RECIPES_SUCCESS,
    GET_USER_RECIPES_FAILURE,
    DELETE_RECIPE_FAILURE,
    DELETE_RECIPE_REQUEST,
    DELETE_RECIPE_SUCCESS,
} from '../actions/recipe';

type LoadingState = boolean;
type ErrorState = string | null;
type SingleRecipeState = IRecipe | null;
type RecipesListState = IRecipe[];

interface RecipeState {
    isCreateLoading: LoadingState;
    isFetchLoading: LoadingState;
    createdRecipe: SingleRecipeState;
    userRecipes: RecipesListState;
    createError: ErrorState;
    fetchError: ErrorState;
    isDeleteLoading: boolean;
    deleteError: ErrorState;
}

const initialState: RecipeState = {
    isCreateLoading: false,
    isFetchLoading: false,
    createdRecipe: null,
    userRecipes: [],
    createError: null,
    fetchError: null,
    isDeleteLoading: false,
    deleteError: null
};

type RecipeAction = {
    type: string;
    payload?: IRecipe | IRecipe[] | string;
};

export const recipeReducer = (state = initialState, action: RecipeAction): RecipeState => {
    switch (action.type) {
        case CREATE_RECIPE_REQUEST:
            return {
                ...state,
                isCreateLoading: true,
                createError: null
            };

        case CREATE_RECIPE_SUCCESS:
            const newRecipe = action.payload as IRecipe;
            const exists = state.userRecipes.some(recipe => recipe._id === newRecipe._id);

            return {
                ...state,
                isCreateLoading: false,
                createdRecipe: newRecipe,
                userRecipes: exists
                    ? state.userRecipes.map(r => r._id === newRecipe._id ? newRecipe : r)
                    : [newRecipe, ...state.userRecipes],
                createError: null
            };

        case CREATE_RECIPE_FAILURE:
            return {
                ...state,
                isCreateLoading: false,
                createError: action.payload as string,
            };

        case GET_USER_RECIPES_REQUEST:
            return {
                ...state,
                isFetchLoading: true,
                fetchError: null,
            };

        case GET_USER_RECIPES_SUCCESS:
            return {
                ...state,
                isFetchLoading: false,
                userRecipes: action.payload as IRecipe[],
            };

        case GET_USER_RECIPES_FAILURE:
            return {
                ...state,
                isFetchLoading: false,
                fetchError: action.payload as string,
            };

        case DELETE_RECIPE_REQUEST:
            return {
                ...state,
                isDeleteLoading: true,
                deleteError: null
            };

        case DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                isDeleteLoading: false,
                userRecipes: state.userRecipes.filter(recipe => recipe._id !== action.payload),
                deleteError: null
            };

        case DELETE_RECIPE_FAILURE:
            return {
                ...state,
                isDeleteLoading: false,
                deleteError: action.payload as string
            };

        default:
            return state;
    }
};