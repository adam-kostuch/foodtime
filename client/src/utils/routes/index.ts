import { LANDING_PAGE, RECIPES_PAGE, ADD_RECIPES_PAGE, UPDATE_RECIPES_PAGE } from '@foodtime/utils/constants';

export const recipePageIdParam = 'recipeId';

export const routes = {
  landingPage: LANDING_PAGE,
  allRecipesPage: RECIPES_PAGE,
  recipePage: `${RECIPES_PAGE}/:${recipePageIdParam}`,
  addRecipePage: ADD_RECIPES_PAGE,
  updateRecipePage: `${UPDATE_RECIPES_PAGE}/:${recipePageIdParam}`,
} as const;
