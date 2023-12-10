import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { theme } from '@foodtime/utils/themes';
import { routes } from '@foodtime/utils/routes';
import { AddRecipePage, AllRecipesPage, LandingPage, RecipePage, UpdateRecipePage } from '@foodtime/views';
import { FoodtimeContextProvider } from '@foodtime/FoodtimeContextProvider';
import Foodtime from '@foodtime/Foodtime';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

const FoodtimeBase = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <FoodtimeContextProvider>
          <BrowserRouter>
            <Foodtime>
              <AppRouter />
            </Foodtime>
          </BrowserRouter>
        </FoodtimeContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppRouter = () => (
  <Routes>
    <Route path={routes.recipePage} element={<RecipePage />} />
    <Route path={routes.allRecipesPage} element={<AllRecipesPage />} />
    <Route path={routes.landingPage} element={<LandingPage />} />
    <Route path={routes.addRecipePage} element={<AddRecipePage />} />
    <Route path={routes.updateRecipePage} element={<UpdateRecipePage />} />
  </Routes>
);

export default FoodtimeBase;
