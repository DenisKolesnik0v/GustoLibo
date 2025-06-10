import { call, put, takeEvery } from 'redux-saga/effects';
import {
    createRecipeRequest,
    createRecipeSuccess,
    createRecipeFailure,
    CREATE_RECIPE_REQUEST,
    getUserRecipesSuccess,
    getUserRecipesFailure,
    GET_USER_RECIPES_REQUEST,
    getUserRecipesRequest,
    deleteRecipeRequest,
    deleteRecipeSuccess,
    deleteRecipeFailure,
    DELETE_RECIPE_REQUEST
} from '../actions/recipe';
import apiClient from '../../utils/apiClient';
import { IRecipe } from '@utils/models/recipe';

const RECIPES_ENDPOINT = '/profile/create-recipe';
const USER_RECIPES_ENDPOINT = '/profile/user-recipes';
const DELETE_RECIPE_ENDPOINT = '/profile/delete-recipe';

function* handleCreateRecipe(action: ReturnType<typeof createRecipeRequest>) {
    try {
        const token = localStorage.getItem('accessToken');

        console.log('Sending request to:', RECIPES_ENDPOINT);
        console.log('Request payload:', action.payload);

        const response: IRecipe = yield call(
            apiClient.post,
            RECIPES_ENDPOINT,
            action.payload,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response) {
            console.error('Invalid response structure:', response);
            throw new Error('Invalid server response structure');
        }

        console.log('Recipe created successfully:', response);

        yield put(createRecipeSuccess(response));
        yield put(getUserRecipesRequest());

    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        console.error('Recipe creation failed:', error);
        yield put(createRecipeFailure(errorMessage));
    }
}

function* handleGetUserRecipes() {
    try {
        const token = localStorage.getItem('accessToken');

        const data: IRecipe[] = yield call(
            apiClient.get,
            USER_RECIPES_ENDPOINT,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (!data) {
            throw new Error('Failed to fetch user recipes');
        }

        yield put(getUserRecipesSuccess(data));

    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Error fetching user recipes';
        yield put(getUserRecipesFailure(errorMessage));
    }
}

function* handleDeleteRecipe(action: ReturnType<typeof deleteRecipeRequest>) {
    try {
      const token = localStorage.getItem('accessToken');
      const recipeId = action.payload;
  
      yield call(
        apiClient.delete,
        `${DELETE_RECIPE_ENDPOINT}/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      yield put(deleteRecipeSuccess(recipeId));
      
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to delete recipe';
      yield put(deleteRecipeFailure(errorMessage));
    }
  }

export function* recipeSaga() {
    yield takeEvery(CREATE_RECIPE_REQUEST, handleCreateRecipe);
    yield takeEvery(GET_USER_RECIPES_REQUEST, handleGetUserRecipes);
    yield takeEvery(DELETE_RECIPE_REQUEST, handleDeleteRecipe);
}