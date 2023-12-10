export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissionLevel?: number;
};

export type Recipe = {
  title: string;
  ingredients: string[];
  image: File;
  instructions: string;
  notes: string;
  authorName: string;
  estimatedTime: string;
  category: string;
  caloriesPerPortion: number;
  amountOfPortions: number;
};

export type RawRecipe = Omit<Recipe, 'image'> & {
  image: {
    data: Buffer;
    contentType: string;
  };
};

export type DisplayRecipe = Omit<Recipe, 'image'> & {
  _id: string;
  image: string;
};
