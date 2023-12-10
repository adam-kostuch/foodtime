import { AuthTokens, RawRecipe, Recipe, User } from '@foodtime/types';

export type GetRecipesResponse = RawRecipe[];
export type GetRecipeResponse = RawRecipe;

export type RegisterPayload = User;
export type RegisterResponse = { _id: string };

export type LoginPayload = {
  email: string;
  password: string;
};
export type LoginResponse = AuthTokens & { user: User };

export type AddRecipePayload = Recipe;
export type AddRecipeResponse = { id: string };

export type UpdateRecipePayload = Omit<Recipe, 'image'> & { image?: File };
export type UpdateRecipeResponse = { id: string };
