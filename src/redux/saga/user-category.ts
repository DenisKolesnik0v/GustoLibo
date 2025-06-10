import { call, put, takeEvery } from 'redux-saga/effects';
import {
    createCategory,
    deleteCategory,
    addRecipe,
    removeRecipe,
    FETCH_CATEGORIES_REQUEST,
    CREATE_CATEGORY_REQUEST,
    DELETE_CATEGORY_REQUEST,
    ADD_RECIPE_REQUEST,
    REMOVE_RECIPE_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    ADD_RECIPE_SUCCESS,
    REMOVE_RECIPE_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    CREATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_FAILURE,
    ADD_RECIPE_FAILURE,
    REMOVE_RECIPE_FAILURE,
    fetchRecipesByIdsFailure,
    fetchRecipesByIdsSuccess,
    FETCH_RECIPES_BY_IDS_REQUEST,
} from '../actions/user-category';
import apiClient from '../../utils/apiClient';
import { IRecipe } from '@utils/models/recipe';

export interface IUserCategory {
    _id: string;
    name: string;
    user: string;
    recipes: string[];
    recipesCount: number;
    img: string;
}

const BASE_ENDPOINT = '/user-categories';

function* handleFetchCategories() {
    try {
        const token = localStorage.getItem('accessToken');
        const categories: IUserCategory[] = yield call(apiClient.get, BASE_ENDPOINT, {
            headers: { Authorization: `Bearer ${token}` },
        });
        yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
    } catch (error) {
        console.error('Fetch categories failed:', error);
        yield put({ type: FETCH_CATEGORIES_FAILURE, message: error });
    }
}

function* handleCreateCategory(action: ReturnType<typeof createCategory>) {
    try {
        const token = localStorage.getItem('accessToken');
        const category: IUserCategory = yield call(apiClient.post, BASE_ENDPOINT, action.payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        yield put({ type: CREATE_CATEGORY_SUCCESS, payload: category });
    } catch (error) {
        console.error('Create category failed:', error);
        yield put({ type: CREATE_CATEGORY_FAILURE, message: error });
    }
}

function* handleDeleteCategory(action: ReturnType<typeof deleteCategory>) {
    try {
        const token = localStorage.getItem('accessToken');
        yield call(apiClient.delete, `${BASE_ENDPOINT}/${action.payload.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        yield put({ type: DELETE_CATEGORY_SUCCESS, payload: action.payload.id });
    } catch (error) {
        console.error('Delete category failed:', error);
        yield put({ type: DELETE_CATEGORY_FAILURE, message: error });
    }
}

function* handleAddRecipe(action: ReturnType<typeof addRecipe>) {
    try {
        const token = localStorage.getItem('accessToken');
        const { categoryId, recipeId } = action.payload;
        const updatedCategory: IUserCategory = yield call(
            apiClient.post,
            `${BASE_ENDPOINT}/${categoryId}/recipes/${recipeId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        yield put({ type: ADD_RECIPE_SUCCESS, payload: updatedCategory });
    } catch (error) {
        console.error('Add recipe to category failed:', error);
        yield put({ type: ADD_RECIPE_FAILURE, message: error });
    }
}

function* handleRemoveRecipe(action: ReturnType<typeof removeRecipe>) {
    try {
        const token = localStorage.getItem('accessToken');
        const { categoryId, recipeId } = action.payload;
        const updatedCategory: IUserCategory = yield call(
            apiClient.delete,
            `${BASE_ENDPOINT}/${categoryId}/recipes/${recipeId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        yield put({ type: REMOVE_RECIPE_SUCCESS, payload: updatedCategory });
    } catch (error) {
        console.error('Remove recipe from category failed:', error);
        yield put({ type: REMOVE_RECIPE_FAILURE, message: error });
    }
}

function* fetchRecipesByIdsSaga(action: any) {
    try {
      const response: IRecipe[] = yield call(apiClient.post, `${BASE_ENDPOINT}/recipes`, {
        ids: action.payload,
      });
  
      yield put(fetchRecipesByIdsSuccess(response));
    } catch (error) {
      console.error('Fetch recipes failed:', error);
      yield put(fetchRecipesByIdsFailure('Ошибка при получении рецептов'));
    }
  }

export function* userCategorySaga() {
    yield takeEvery(FETCH_CATEGORIES_REQUEST, handleFetchCategories);
    yield takeEvery(CREATE_CATEGORY_REQUEST, handleCreateCategory);
    yield takeEvery(DELETE_CATEGORY_REQUEST, handleDeleteCategory);
    yield takeEvery(ADD_RECIPE_REQUEST, handleAddRecipe);
    yield takeEvery(REMOVE_RECIPE_REQUEST, handleRemoveRecipe);
    yield takeEvery(FETCH_RECIPES_BY_IDS_REQUEST, fetchRecipesByIdsSaga);
}
