import { IRecipe } from "@utils/models/recipe";

export const FETCH_CATEGORIES_REQUEST = 'userCategory/FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'userCategory/FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'userCategory/FETCH_CATEGORIES_FAILURE';

export const CREATE_CATEGORY_REQUEST = 'userCategory/CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'userCategory/CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'userCategory/CREATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY_REQUEST = 'userCategory/DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'userCategory/DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'userCategory/DELETE_CATEGORY_FAILURE';

export const ADD_RECIPE_REQUEST = 'userCategory/ADD_RECIPE_REQUEST';
export const ADD_RECIPE_SUCCESS = 'userCategory/ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAILURE = 'userCategory/ADD_RECIPE_FAILURE';

export const REMOVE_RECIPE_REQUEST = 'userCategory/REMOVE_RECIPE_REQUEST';
export const REMOVE_RECIPE_SUCCESS = 'userCategory/REMOVE_RECIPE_SUCCESS';
export const REMOVE_RECIPE_FAILURE = 'userCategory/REMOVE_RECIPE_FAILURE';

export const FETCH_RECIPES_BY_IDS_REQUEST = 'FETCH_RECIPES_BY_IDS_REQUEST';
export const FETCH_RECIPES_BY_IDS_SUCCESS = 'FETCH_RECIPES_BY_IDS_SUCCESS';
export const FETCH_RECIPES_BY_IDS_FAILURE = 'FETCH_RECIPES_BY_IDS_FAILURE';

export const fetchRecipesByIdsRequest = (ids: string[]) => ({
  type: FETCH_RECIPES_BY_IDS_REQUEST,
  payload: ids,
});

export const fetchRecipesByIdsSuccess = (recipes: IRecipe[]) => ({
  type: FETCH_RECIPES_BY_IDS_SUCCESS,
  payload: recipes,
});

export const fetchRecipesByIdsFailure = (error: string) => ({
  type: FETCH_RECIPES_BY_IDS_FAILURE,
  payload: error,
});

export const fetchCategories = () => ({ type: FETCH_CATEGORIES_REQUEST });
export const createCategory = (name: string) => ({ type: CREATE_CATEGORY_REQUEST, payload: { name } });
export const deleteCategory = (id: string) => ({ type: DELETE_CATEGORY_REQUEST, payload: { id } });
export const addRecipe = (categoryId: string, recipeId: string) => ({
    type: ADD_RECIPE_REQUEST,
    payload: { categoryId, recipeId }
});
export const removeRecipe = (categoryId: string, recipeId: string) => ({
    type: REMOVE_RECIPE_REQUEST,
    payload: { categoryId, recipeId }
});
