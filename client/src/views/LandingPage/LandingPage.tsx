import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { Divider, Flex, Loader, PageContent, Typography } from '@foodtime/components';
import { midnightDarker } from '@foodtime/utils/colors';
import { useGetRecipes } from '@foodtime/hooks';
import { DisplayRecipe } from '@foodtime/types';
import { ADD_RECIPES_PAGE } from '@foodtime/utils/constants';
import { AddCircleOutline, LibraryBooks } from '@mui/icons-material';
import { Box, Button, Link, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const LandingPage = () => {
  const { isAuthenticated, setIsLoginModalOpen } = useFoodtimeContext();
  const { data: recipes, isLoading } = useGetRecipes();

  const handleRecipeButtonPress = () => {
    if (isAuthenticated) {
      window.location.href = ADD_RECIPES_PAGE;
    }
    setIsLoginModalOpen(true);
  };

  if (!recipes || isLoading) {
    return <Loader />;
  }

  return (
    <PageContent>
      <Stack direction="row" height="100%" divider={<Divider />}>
        <Flex width="70%" height="100%" alignItems="center" justifyContent="center">
          <Box>
            <Flex justifyContent="space-between" alignItems="center">
              <Typography component="h1" fontSize="1.5em">
                Recommended recipes
              </Typography>
              <Link href="/recipes">See more...</Link>
            </Flex>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              style={{ width: '45vw', height: '50vh', backgroundColor: midnightDarker }}
            >
              {recipes.map((recipe: DisplayRecipe) => (
                <SwiperSlide
                  key={`${recipe.image}+${recipe.title}`}
                  onClick={() => (window.location.href = `/recipes/${recipe._id}`)}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img src={recipe.image} alt={recipe.title} style={{ width: '100%' }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Flex>
        <Flex p={4} width="30%" height="90%" justifyContent="center" alignItems="center">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                sx={{ px: 4, fontSize: '1.5em', width: '100%' }}
                startIcon={<AddCircleOutline sx={{ fontSize: '1.2em !important' }} />}
                onClick={handleRecipeButtonPress}
              >
                Add new recipe!
              </Button>
              <Button
                variant="outlined"
                sx={{ px: 4, fontSize: '1.5em', width: '100%' }}
                startIcon={<LibraryBooks sx={{ fontSize: '1.2em !important' }} />}
                onClick={() => (window.location.href = '/recipes')}
              >
                See all recipes!
              </Button>
            </Stack>
            <Stack spacing={1}>
              <Typography component="h2" fontSize="1.5em" fontWeight="bolder" textAlign="center">
                About Us...
              </Typography>
              <Typography component="span">
                Welcome to Foodtime, where culinary enthusiasts and food aficionados come together to celebrate the art
                and joy of gastronomy! Established a year ago, Foodtime has quickly become a vibrant online community
                dedicated to sharing, exploring, and savoring the world of food. <br />
                <br />
                At Foodtime, we believe that food is not just a necessity; it is a passion, a cultural expression, and a
                source of endless inspiration. Whether you are a seasoned chef, a home cook, or someone just discovering
                the pleasures of the kitchen, Foodtime provides a welcoming space for all. Our forum is brimming with
                discussions on global cuisines, innovative cooking techniques, and the latest food trends. It is a place
                where you can learn, share, and bond over the universal love for delicious creations. <br />
                <br />
                Join us on a gastronomic journey where flavors collide, cultures intertwine, and the joy of cooking is
                at the heart of every conversation. At Foodtime, we are not just building a forum; we are creating a
                community united by a shared passion for all things food.
              </Typography>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </PageContent>
  );
};

export default LandingPage;
