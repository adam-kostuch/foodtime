import { useMutation } from 'react-query';
import { AddRecipePayload } from '@foodtime/services/FoodtimeApiClient/types';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';

const useAddRecipe = () => {
  const { client } = useFoodtimeContext();

  return useMutation(
    async (payload: AddRecipePayload) => {
      console.log({ payload });
      return await client.addRecipe(payload);
    },
    {
      onSuccess: () => {
        console.log('Recipe successfully added!');
      },
      onError: () => {
        console.log('Recipe failed to add!');
      },
    }
  );
};

export default useAddRecipe;
