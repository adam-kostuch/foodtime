import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';
import { AUTH_ENDPOINT, FOODTIME_URL, USERS_ENDPOINT, RECIPES_ENDPOINT } from '@foodtime/utils/constants';
import {
  AddRecipePayload,
  AddRecipeResponse,
  GetRecipesResponse,
  GetRecipeResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UpdateRecipePayload,
  UpdateRecipeResponse,
} from '@foodtime/services/FoodtimeApiClient/types';

class FoodtimeApiClient {
  private static instance: FoodtimeApiClient;
  private baseUrl = `${FOODTIME_URL}`;
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
    this.client.interceptors.response.use(this.onResponse, this.onResponseError);
  }

  protected onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  protected onResponseError = (error: AxiosError): AxiosPromise => {
    return Promise.reject(error);
  };

  public static getInstance(): FoodtimeApiClient {
    if (!FoodtimeApiClient.instance) {
      FoodtimeApiClient.instance = new FoodtimeApiClient();
    }

    return FoodtimeApiClient.instance;
  }

  public register = (payload: RegisterPayload): Promise<AxiosResponse<RegisterResponse>> => {
    return this.client.post(`${this.baseUrl}${USERS_ENDPOINT}`, payload);
  };

  public login = (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> => {
    return this.client.post(`${this.baseUrl}${AUTH_ENDPOINT}`, payload);
  };

  public addRecipe = (payload: AddRecipePayload): Promise<AxiosResponse<AddRecipeResponse>> => {
    return this.client.post(`${this.baseUrl}${RECIPES_ENDPOINT}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  public updateRecipe = (
    recipeId: string,
    payload: UpdateRecipePayload
  ): Promise<AxiosResponse<UpdateRecipeResponse>> => {
    return this.client.patch(`${this.baseUrl}${RECIPES_ENDPOINT}/${recipeId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  public removeRecipe = (recipeId: string): Promise<AxiosResponse<void>> => {
    return this.client.delete(`${this.baseUrl}${RECIPES_ENDPOINT}/${recipeId}`);
  };

  public getRecipes = (): Promise<AxiosResponse<GetRecipesResponse>> => {
    return this.client.get(`${this.baseUrl}${RECIPES_ENDPOINT}`);
  };

  public getRecipe = (recipeId: string): Promise<AxiosResponse<GetRecipeResponse>> => {
    return this.client.get(`${this.baseUrl}${RECIPES_ENDPOINT}/${recipeId}`);
  };
}

export default FoodtimeApiClient;
