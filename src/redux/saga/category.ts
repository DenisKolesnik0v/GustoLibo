import { call, put, takeEvery } from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import {
  fetchAllCategoriesSuccess,
  fetchAllCategoriesFailure,
  FETCH_ALL_CATEGORIES_REQUEST,
  ICategory,
  allRecipesSuccess,
  allRecipesFailure,
  ALL_RECIPES,
  fetchRecipeByIdSuccess,
  fetchRecipeByIdFailure,
  FETCH_RECIPE_BY_ID,
  fetchRecipesByRegionFailure,
  fetchRecipesByRegionSuccess,
  FETCH_RECIPES_BY_REGION,
  fetchRecipesByCountryFailure,
  fetchRecipesByCountrySuccess,
  FETCH_RECIPES_BY_COUNTRY,
  fetchRecipesByCategoryFailure,
  fetchRecipesByCategorySuccess,
  FETCH_RECIPES_BY_CATEGORY,
  searchRecipesFailure,
  searchRecipesSuccess,
  SEARCH_RECIPES_REQUEST,
} from '@redux/actions/categories';
import { IRecipe } from '@utils/models/recipe';

function* handleFetchAllCategories() {
  try {
    const response: ICategory[] = yield call(apiClient.get, '/categories/all-categories');
    yield put(fetchAllCategoriesSuccess(response));
  } catch (error) {
    console.error('Fetch all categories failed:', error);
    yield put(fetchAllCategoriesFailure('Ошибка при получении категорий'));
  }
}

function* fetchRecipesSaga() {
  try {
    const response: IRecipe[] = yield call(apiClient.get, '/categories/all-recipes');

    yield put(allRecipesSuccess(response));
  } catch (error: any) {
    yield put(allRecipesFailure(error.message));
  }
}

function* fetchRecipeById(action: { type: string; payload: string }) {
  try {
    const response: IRecipe = yield call(apiClient.get, `/categories/recipe/${action.payload}`);

    yield put(fetchRecipeByIdSuccess(response));
  } catch (error: any) {
    yield put(fetchRecipeByIdFailure(error.message));
  }
}

function* fetchRecipesByRegionSaga(action: { type: string; payload: string }) {
  try {
    const region = action.payload;
    const response: IRecipe[] = yield call(apiClient.get, `/categories/recipe-by-region/${region}`);

    yield put(fetchRecipesByRegionSuccess(response));
  } catch (error: any) {
    yield put(fetchRecipesByRegionFailure(error.message));
  }
}

function* fetchRecipesByCountrySaga(action: { type: string; payload: string }) {
  try {
    const country = action.payload;
    const response: IRecipe[] = yield call(apiClient.get, `/categories/recipe-by-country/${country}`);

    yield put(fetchRecipesByCountrySuccess(response));
  } catch (error: any) {
    yield put(fetchRecipesByCountryFailure(error.message));
  }
}

function* fetchRecipesByCategorySaga(action: { type: string; payload: string }) {
  try {
    const category = action.payload;
    const response: IRecipe[] = yield call(apiClient.get, `/categories/recipes/category/${category}`);

    if (!response) {
      yield put(fetchRecipesByCategoryFailure(response));
    }

    yield put(fetchRecipesByCategorySuccess(response));
  } catch (error: any) {
    yield put(fetchRecipesByCategoryFailure(error.message));
  }
}

function* searchRecipesSaga(action: { type: string; payload: string }) {
  try {
    const query = action.payload;

    const searchTerms = query.split(',')
      .map(term => term.trim())
      .filter(term => term.length > 0);

    if (searchTerms.length === 0) {
      throw new Error('Не указаны условия поиска');
    }

    const encodedQuery = encodeURIComponent(query);
    const response: IRecipe[] = yield call(
      apiClient.get,
      `/categories/search?query=${encodedQuery}`
    );

    yield put(searchRecipesSuccess(response));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message ||
      error.message ||
      'Ошибка при поиске рецептов';
    yield put(searchRecipesFailure(errorMessage));
  }
}


export function* categorySaga() {
  yield takeEvery(FETCH_ALL_CATEGORIES_REQUEST, handleFetchAllCategories);
  yield takeEvery(ALL_RECIPES, fetchRecipesSaga);
  yield takeEvery(FETCH_RECIPE_BY_ID, fetchRecipeById);
  yield takeEvery(FETCH_RECIPES_BY_REGION, fetchRecipesByRegionSaga);
  yield takeEvery(FETCH_RECIPES_BY_COUNTRY, fetchRecipesByCountrySaga);
  yield takeEvery(FETCH_RECIPES_BY_CATEGORY, fetchRecipesByCategorySaga);
  yield takeEvery(SEARCH_RECIPES_REQUEST, searchRecipesSaga);
}
