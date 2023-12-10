import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';

const useLogout = () => {
  const { removeToken, removeRole } = useFoodtimeContext();

  const logout = () => {
    removeToken();
    removeRole();
  };

  return { logout };
};

export default useLogout;
