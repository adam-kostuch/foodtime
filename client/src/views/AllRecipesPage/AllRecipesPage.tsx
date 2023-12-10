import { Flex, Loader, PageContent, RecipeThumbnail, Typography } from '@foodtime/components';
import { useGetRecipes } from '@foodtime/hooks';
import { Box, Button, Grid, Paper, Stack } from '@mui/material';

const AllRecipesPage = () => {
  const { data: recipes, isLoading } = useGetRecipes();

  if (!recipes || isLoading) {
    return <Loader />;
  }

  return (
    <PageContent>
      <Flex alignItems="center" justifyContent="center">
        <Paper
          elevation={5}
          sx={{
            px: 5,
            backgroundColor: 'transparent',
            width: '80vw',
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
            All recipes!
          </Typography>
          <Stack spacing={4} mt={2}>
            <Grid container spacing={2} sx={{ overflowY: 'auto', overflowX: 'hidden', height: '60vh', pb: 2, pr: 2 }}>
              {recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`${recipe.image}+${recipe.title}`}>
                  <RecipeThumbnail recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Box position="absolute" bottom="0" pb={4} width="90%">
            <Flex justifyContent="right">
              <Button variant="outlined" href="/recipes/add">
                Add recipe
              </Button>
            </Flex>
          </Box>
        </Paper>
      </Flex>
    </PageContent>
  );
};

export default AllRecipesPage;
