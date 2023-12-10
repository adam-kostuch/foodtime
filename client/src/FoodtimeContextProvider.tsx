import { ReactNode, createContext, useContext, useState } from 'react';
import { FoodtimeApiClient } from './services/FoodtimeApiClient';
import { AuthTokens } from '@foodtime/types';

const nullableTokens = { accessToken: '', refreshToken: '' };
const getToken = () => {
  const tokenString = (sessionStorage.getItem('token') as string) || JSON.stringify(nullableTokens);
  const userToken = JSON.parse(tokenString) as AuthTokens;

  return userToken.accessToken;
};
const getRole = (): 1 | 2 => {
  const roleString = (sessionStorage.getItem('role') as string) || JSON.stringify(1);
  const role = Number(JSON.parse(roleString)) as 1 | 2;

  return role;
};

export type FoodtimeContextData = {
  setRole: (role: 1 | 2) => void;
  setToken: (tokens: AuthTokens) => void;
  removeRole: () => void;
  removeToken: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
  client: FoodtimeApiClient;
  isRegisterModalOpen: boolean;
  isLoginModalOpen: boolean;
  isLogoutModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  setIsLoginModalOpen: (open: boolean) => void;
  setIsLogoutModalOpen: (open: boolean) => void;
};

type FoodtimeContextProviderProps = {
  children: ReactNode;
};

const FoodtimeContext = createContext<FoodtimeContextData | undefined>(undefined);

export const FoodtimeContextProvider = ({ children, ...rest }: FoodtimeContextProviderProps) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState<1 | 2>(getRole());

  const setSessionToken = (userToken: AuthTokens) => {
    setToken(userToken.accessToken);
    sessionStorage.setItem('token', JSON.stringify(userToken));
  };

  const setSessionRole = (role: 1 | 2) => {
    setRole(role);
    sessionStorage.setItem('role', JSON.stringify(role));
  };

  const removeToken = () => {
    setToken('');
    sessionStorage.removeItem('token');
  };

  const removeRole = () => {
    setRole(1);
    sessionStorage.removeItem('role');
  };

  return (
    <FoodtimeContext.Provider
      value={{
        ...rest,
        isRegisterModalOpen,
        isLoginModalOpen,
        isLogoutModalOpen,
        setIsRegisterModalOpen,
        setIsLoginModalOpen,
        setIsLogoutModalOpen,
        removeToken,
        removeRole,
        setRole: setSessionRole,
        setToken: setSessionToken,
        isAdmin: role === 2,
        isAuthenticated: token !== '',
        client: FoodtimeApiClient.getInstance(),
      }}
    >
      {children}
    </FoodtimeContext.Provider>
  );
};

export const useFoodtimeContext = () => {
  const context = useContext(FoodtimeContext);
  if (context === undefined) {
    throw new Error('useFoodtimeContext must be used within a FoodtimeContextProvider');
  }
  return context;
};
