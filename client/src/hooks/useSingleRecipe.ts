import { Buffer } from 'buffer';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { DisplayRecipe, RawRecipe } from '@foodtime/types';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useSingleRecipe = () => {
  const { recipeId } = useParams();
  const { client } = useFoodtimeContext();

  return useQuery(['fetchRecipe'], async () => {
    const { data }: { data: RawRecipe } = await client.getRecipe(recipeId as string);

    const image = `data:${data?.image?.contentType ?? ''};base64, ${Buffer.from(data?.image?.data ?? '').toString(
      'base64'
    )}`;

    return { ...data, image } as DisplayRecipe;
  });
};

export default useSingleRecipe;
