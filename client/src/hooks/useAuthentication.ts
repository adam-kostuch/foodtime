import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';

const useAuthentication = () => {
  const { isAuthenticated } = useFoodtimeContext();
  if (!isAuthenticated) {
    window.location.href = '/';
  }
};

export default useAuthentication;
