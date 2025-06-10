import { IRecipe } from "@utils/models/recipe";

export const FETCH_ALL_CATEGORIES_REQUEST = 'FETCH_ALL_CATEGORIES_REQUEST';
export const FETCH_ALL_CATEGORIES_SUCCESS = 'FETCH_ALL_CATEGORIES_SUCCESS';
export const FETCH_ALL_CATEGORIES_FAILURE = 'FETCH_ALL_CATEGORIES_FAILURE';

export const ALL_RECIPES = 'ALL_RECIPES';
export const ALL_RECIPES_SUCCESS = 'ALL_RECIPES_SUCCESS';
export const ALL_RECIPES_FAILURE = 'ALL_RECIPES_FAILURE';

export const FETCH_RECIPE_BY_ID = 'FETCH_RECIPE_BY_ID';
export const FETCH_RECIPE_BY_ID_SUCCESS = 'FETCH_RECIPE_BY_ID_SUCCESS';
export const FETCH_RECIPE_BY_ID_FAILURE = 'FETCH_RECIPE_BY_ID_FAILURE';

export const FETCH_RECIPES_BY_REGION = 'FETCH_RECIPES_BY_REGION';
export const FETCH_RECIPES_BY_REGION_SUCCESS = 'FETCH_RECIPES_BY_REGION_SUCCESS';
export const FETCH_RECIPES_BY_REGION_FAILURE = 'FETCH_RECIPES_BY_REGION_FAILURE';

export const FETCH_RECIPES_BY_COUNTRY = 'FETCH_RECIPES_BY_COUNTRY';
export const FETCH_RECIPES_BY_COUNTRY_SUCCESS = 'FETCH_RECIPES_BY_COUNTRY_SUCCESS';
export const FETCH_RECIPES_BY_COUNTRY_FAILURE = 'FETCH_RECIPES_BY_COUNTRY_FAILURE';

export const FETCH_RECIPES_BY_CATEGORY = 'FETCH_RECIPES_BY_CATEGORY';
export const FETCH_RECIPES_BY_CATEGORY_SUCCESS = 'FETCH_RECIPES_BY_CATEGORY_SUCCESS';
export const FETCH_RECIPES_BY_CATEGORY_FAILURE = 'FETCH_RECIPES_BY_CATEGORY_FAILURE';

export const SEARCH_RECIPES_REQUEST = 'SEARCH_RECIPES_REQUEST';
export const SEARCH_RECIPES_SUCCESS = 'SEARCH_RECIPES_SUCCESS';
export const SEARCH_RECIPES_FAILURE = 'SEARCH_RECIPES_FAILURE';

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const fetchAllCategoriesRequest = () => ({ type: FETCH_ALL_CATEGORIES_REQUEST });
export const fetchAllCategoriesSuccess = (categories: ICategory[]) => ({
  type: FETCH_ALL_CATEGORIES_SUCCESS,
  payload: categories,
});
export const fetchAllCategoriesFailure = (error: string) => ({
  type: FETCH_ALL_CATEGORIES_FAILURE,
  payload: error,
});

export const allRecipes = () => ({
  type: ALL_RECIPES,
});

export const allRecipesSuccess = (recipes: IRecipe[]) => ({
  type: ALL_RECIPES_SUCCESS,
  payload: recipes,
});

export const allRecipesFailure = (error: string) => ({
  type: ALL_RECIPES_FAILURE,
  payload: error,
});

export const fetchRecipeById = (id: string) => ({
  type: FETCH_RECIPE_BY_ID,
  payload: id,
});

export const fetchRecipeByIdSuccess = (recipe: IRecipe) => ({
  type: FETCH_RECIPE_BY_ID_SUCCESS,
  payload: recipe,
});

export const fetchRecipeByIdFailure = (error: string) => ({
  type: FETCH_RECIPE_BY_ID_FAILURE,
  payload: error,
});

export const fetchRecipesByRegion = (region: string) => ({
  type: FETCH_RECIPES_BY_REGION,
  payload: region,
});

export const fetchRecipesByRegionSuccess = (recipes: IRecipe[]) => ({
  type: FETCH_RECIPES_BY_REGION_SUCCESS,
  payload: recipes,
});

export const fetchRecipesByRegionFailure = (error: string) => ({
  type: FETCH_RECIPES_BY_REGION_FAILURE,
  payload: error,
});

export const fetchRecipesByCountry = (country: string) => ({
  type: FETCH_RECIPES_BY_COUNTRY,
  payload: country,
});

export const fetchRecipesByCountrySuccess = (recipes: IRecipe[]) => ({
  type: FETCH_RECIPES_BY_COUNTRY_SUCCESS,
  payload: recipes,
});

export const fetchRecipesByCountryFailure = (error: string) => ({
  type: FETCH_RECIPES_BY_COUNTRY_FAILURE,
  payload: error,
});

export const fetchRecipesByCategory = (category: string) => ({
  type: FETCH_RECIPES_BY_CATEGORY,
  payload: category,
});

export const fetchRecipesByCategorySuccess = (recipes: IRecipe[]) => ({
  type: FETCH_RECIPES_BY_CATEGORY_SUCCESS,
  payload: recipes,
});

export const fetchRecipesByCategoryFailure = (error: string) => ({
  type: FETCH_RECIPES_BY_CATEGORY_FAILURE,
  payload: error,
});

export const searchRecipesRequest = (query: string) => ({
  type: SEARCH_RECIPES_REQUEST,
  payload: query,
});

export const searchRecipesSuccess = (recipes: IRecipe[]) => ({
  type: SEARCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const searchRecipesFailure = (error: string) => ({
  type: SEARCH_RECIPES_FAILURE,
  payload: error,
});
