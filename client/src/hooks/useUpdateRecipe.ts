import { useMutation } from 'react-query';
import { UpdateRecipePayload } from '@foodtime/services/FoodtimeApiClient/types';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { useParams } from 'react-router-dom';

const useUpdateRecipe = () => {
  const { client } = useFoodtimeContext();
  const { recipeId } = useParams();

  return useMutation(
    async (payload: UpdateRecipePayload) => {
      console.log({ payload });
      return await client.updateRecipe(recipeId as string, payload);
    },
    {
      onSuccess: () => {
        console.log('Recipe successfully updated!');
      },
      onError: () => {
        console.log('Recipe failed to updated!');
      },
    }
  );
};

export default useUpdateRecipe;
