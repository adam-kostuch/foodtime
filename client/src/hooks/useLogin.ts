import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { LoginPayload } from '@foodtime/services/FoodtimeApiClient/types';
import { useMutation } from 'react-query';

const useLogin = () => {
  const { client } = useFoodtimeContext();

  return useMutation(
    async (payload: LoginPayload) => {
      return await client.login(payload);
    },
    {
      onSuccess: () => {
        console.log('Login successful!');
      },
      onError: () => {
        console.log('Login failed!');
      },
    }
  );
};

export default useLogin;
