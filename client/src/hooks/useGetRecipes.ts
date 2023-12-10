import { Buffer } from 'buffer';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { DisplayRecipe, RawRecipe } from '@foodtime/types';
import { useQuery } from 'react-query';

const useGetRecipes = () => {
  const { client } = useFoodtimeContext();

  return useQuery(['fetchRecipes'], async () => {
    const { data } = await client.getRecipes();
    const recipes: DisplayRecipe[] = [];

    data?.forEach((recipe: RawRecipe) => {
      const image = `data:${recipe?.image?.contentType ?? ''};base64, ${Buffer.from(recipe?.image?.data ?? '').toString(
        'base64'
      )}`;

      recipes.push({ ...recipe, image });
    });

    return recipes;
  });
};

export default useGetRecipes;
