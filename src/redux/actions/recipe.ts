import { IRecipe } from "@utils/models/recipe";

export const CREATE_RECIPE_REQUEST = 'CREATE_RECIPE_REQUEST';
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS';
export const CREATE_RECIPE_FAILURE = 'CREATE_RECIPE_FAILURE';
export const GET_USER_RECIPES_REQUEST = 'GET_USER_RECIPES_REQUEST';
export const GET_USER_RECIPES_SUCCESS = 'GET_USER_RECIPES_SUCCESS';
export const GET_USER_RECIPES_FAILURE = 'GET_USER_RECIPES_FAILURE';
export const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAILURE = 'DELETE_RECIPE_FAILURE';

export const deleteRecipeRequest = (recipeId: string) => ({
  type: DELETE_RECIPE_REQUEST,
  payload: recipeId
});

export const deleteRecipeSuccess = (recipeId: string) => ({
  type: DELETE_RECIPE_SUCCESS,
  payload: recipeId
});

export const deleteRecipeFailure = (error: string) => ({
  type: DELETE_RECIPE_FAILURE,
  payload: error
});

export const getUserRecipesRequest = () => ({
  type: GET_USER_RECIPES_REQUEST
});

export const getUserRecipesSuccess = (recipes: IRecipe[]) => ({
  type: GET_USER_RECIPES_SUCCESS,
  payload: recipes
});

export const getUserRecipesFailure = (error: string) => ({
  type: GET_USER_RECIPES_FAILURE,
  payload: error
});

export const createRecipeRequest = (recipeData: IRecipe) => ({
  type: CREATE_RECIPE_REQUEST,
  payload: recipeData,
});

export const createRecipeSuccess = (recipe: IRecipe) => ({
  type: CREATE_RECIPE_SUCCESS,
  payload: recipe,
});

export const createRecipeFailure = (error: string) => ({
  type: CREATE_RECIPE_FAILURE,
  payload: error,
});
