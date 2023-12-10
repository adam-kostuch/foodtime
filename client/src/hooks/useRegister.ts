import { useMutation } from 'react-query';
import { RegisterPayload } from '@foodtime/services/FoodtimeApiClient/types';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';

const useRegister = () => {
  const { client } = useFoodtimeContext();

  return useMutation(
    async (payload: RegisterPayload) => {
      return await client.register(payload);
    },
    {
      onSuccess: () => {
        console.log('Register successful!');
      },
      onError: () => {
        console.log('Register failed!');
      },
    }
  );
};

export default useRegister;
