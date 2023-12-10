import { useMutation } from 'react-query';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';

const useRemoveRecipe = () => {
  const { client } = useFoodtimeContext();

  return useMutation(
    async (recipeId: string) => {
      return await client.removeRecipe(recipeId);
    },
    {
      onSuccess: () => {
        console.log('Recipe successfully removed!');
      },
      onError: () => {
        console.log('Recipe failed to remove!');
      },
    }
  );
};

export default useRemoveRecipe;
