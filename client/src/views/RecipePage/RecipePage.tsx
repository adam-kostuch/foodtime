import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { Actions, Flex, Loader, PageContent, Typography, RemoveModal } from '@foodtime/components';
import { useSingleRecipe } from '@foodtime/hooks';
import { spookyGrey, pumpkinOrange, midnightDark } from '@foodtime/utils/colors';
import { Box, Button, List, Paper, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { recipeId } = useParams();

  const [isOpen, setOpen] = useState(false);
  const { data: recipe, isLoading } = useSingleRecipe();
  const { isAdmin } = useFoodtimeContext();

  const onClose = () => setOpen(false);

  if (isLoading || !recipe) {
    return <Loader />;
  }

  return (
    <>
      <PageContent>
        <Flex alignItems="center" justifyContent="center">
          <Paper
            elevation={5}
            sx={{
              px: 5,
              backgroundColor: 'transparent',
              width: '50vw',
              overflow: 'auto',
              height: '80vh',
              position: 'relative',
            }}
          >
            <Typography
              py={2}
              component="h1"
              fontSize="1.5em"
              fontWeight="bolder"
              textAlign="center"
              sx={{ textTransform: 'uppercase' }}
            >
              {recipe.title}
              <Typography component="span" textTransform="none">
                , by{' '}
                <Typography component="span" color={pumpkinOrange} sx={{ textDecoration: 'center' }}>
                  {recipe.authorName}
                </Typography>
              </Typography>
            </Typography>
            <Stack spacing={2}>
              <Flex flexWrap="wrap" justifyContent="center">
                <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', maxHeight: '25vh' }} />
                <Stack width="100%" p={2}>
                  <Typography component="span" paragraph>
                    {recipe.notes}
                  </Typography>
                  <Stack spacing={1}>
                    <Box>
                      <Typography color={pumpkinOrange}>Overall information:</Typography>
                      <InfoBox>
                        <InfoBoxTypography>Estimated Time: {recipe.estimatedTime}</InfoBoxTypography>
                        <InfoBoxTypography>Category: {recipe.category}</InfoBoxTypography>
                        <InfoBoxTypography>Calories per Portion: {recipe.caloriesPerPortion} kcal</InfoBoxTypography>
                        <InfoBoxTypography>Amount of Portions: {recipe.amountOfPortions}</InfoBoxTypography>
                      </InfoBox>
                    </Box>
                    <Box>
                      <Typography color={pumpkinOrange}>Ingredients:</Typography>
                      <InfoBox>
                        <List disablePadding>
                          {recipe.ingredients?.map((ingredient, index) => (
                            <InfoBoxTypography key={index}>{ingredient};</InfoBoxTypography>
                          ))}
                        </List>
                      </InfoBox>
                    </Box>
                    <Box>
                      <Typography color={pumpkinOrange}>Instructions:</Typography>
                      <InfoBox>
                        <InfoBoxTypography>{recipe.instructions}</InfoBoxTypography>
                      </InfoBox>
                    </Box>
                  </Stack>
                </Stack>
              </Flex>
            </Stack>
            <Box position="absolute" bottom="0" pb={4} pt={2} width="90%" bgcolor={midnightDark}>
              <Flex justifyContent="space-between">
                <Button variant="outlined" href="/recipes">
                  All recipes
                </Button>
                {isAdmin && (
                  <Actions>
                    <Button variant="outlined" href={`/recipes/update/${recipeId}`}>
                      Update recipe
                    </Button>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                      Remove recipe
                    </Button>
                  </Actions>
                )}
              </Flex>
            </Box>
          </Paper>
        </Flex>
      </PageContent>
      <RemoveModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RecipePage;

const InfoBox = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ backgroundColor: spookyGrey, borderRadius: 2, px: 2, py: 1 }}>{children}</Box>;
};

const InfoBoxTypography = ({ children }: { children: ReactNode }) => {
  return <Typography sx={{ fontSize: '0.9em' }}>{children}</Typography>;
};
