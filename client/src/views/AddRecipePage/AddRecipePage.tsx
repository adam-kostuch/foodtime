import { ChangeEvent } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Container, Grid, Paper, Snackbar } from '@mui/material';
import { useAddRecipe, useAuthentication } from '@foodtime/hooks';
import { Flex, TextField, PageContent, Typography } from '@foodtime/components';
import { bloodyRed } from '@foodtime/utils/colors';
import { RECIPES_PAGE } from '@foodtime/utils/constants';

type FormData = {
  title: string;
  ingredients: string;
  image: File | null;
  instructions: string;
  notes: string;
  authorName: string;
  estimatedTime: string;
  category: string;
  caloriesPerPortion: number;
  amountOfPortions: number;
};

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  ingredients: yup.string().required('Ingredients are required'),
  image: yup.mixed().required('Image is required'),
  instructions: yup.string().required('Instructions are required'),
  notes: yup.string(),
  authorName: yup.string().required('Author Name is required'),
  estimatedTime: yup.string().required('Estimated time is required'),
  category: yup.string().required('Category is required'),
  caloriesPerPortion: yup.number().required('Calories per portion is required'),
  amountOfPortions: yup.number().required('Amount of portions is required'),
});

const AddRecipePage = () => {
  useAuthentication();

  const addRecipe = useAddRecipe();
  const formik = useFormik({
    initialValues: {
      title: '',
      ingredients: '',
      image: null,
      instructions: '',
      notes: '',
      authorName: '',
      estimatedTime: '',
      category: '',
      caloriesPerPortion: 0,
      amountOfPortions: 0,
    } as FormData,
    validationSchema,
    onSubmit: async (values) => {
      const ingredientsArray = values.ingredients.split(';');

      const {
        data: { id: recipeId },
      } = await addRecipe.mutateAsync({
        ...values,
        image: values.image as File,
        ingredients: ingredientsArray,
      });

      if (recipeId) {
        setTimeout(() => {
          window.location.href = `${RECIPES_PAGE}/${recipeId}`;
        }, 3000);
      }
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('image', event.currentTarget.files?.[0] ?? null);
  };

  return (
    <>
      <PageContent>
        <Flex justifyContent="center" alignItems="center" height="80vh">
          <Paper
            elevation={5}
            sx={{
              px: 5,
              backgroundColor: 'transparent',
              width: '80vw',
              overflow: 'auto',
              height: '80vh',
              position: 'relative',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'center',
              alignItems: 'center',
            }}
          >
            <Container>
              <Typography
                component="h1"
                fontSize="1.5em"
                fontWeight="bolder"
                textAlign="center"
                sx={{ textTransform: 'uppercase' }}
              >
                Add your own recipe!
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1} mb={4}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      placeholder="Butter chicken"
                      {...formik.getFieldProps('title')}
                      error={formik.touched.authorName && Boolean(formik.errors.authorName)}
                      helperText={formik.touched.authorName && formik.errors.authorName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Author Name"
                      variant="outlined"
                      placeholder="seba12"
                      {...formik.getFieldProps('authorName')}
                      error={formik.touched.authorName && Boolean(formik.errors.authorName)}
                      helperText={formik.touched.authorName && formik.errors.authorName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      label="Ingredients (separate ingredients with semi-colon)"
                      variant="outlined"
                      placeholder="butter: 1tbsp; chicken: 1 breast"
                      {...formik.getFieldProps('ingredients')}
                      error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                      helperText={formik.touched.ingredients && formik.errors.ingredients}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Instructions"
                      variant="outlined"
                      placeholder="Add butter to chicken and then fry it till crispy brown!"
                      {...formik.getFieldProps('instructions')}
                      error={formik.touched.instructions && Boolean(formik.errors.instructions)}
                      helperText={formik.touched.instructions && formik.errors.instructions}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Notes"
                      variant="outlined"
                      placeholder="Butter Chicken is an amazing dish with great history behind it..."
                      {...formik.getFieldProps('notes')}
                      error={formik.touched.notes && Boolean(formik.errors.notes)}
                      helperText={formik.touched.notes && formik.errors.notes}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Estimated time"
                      variant="outlined"
                      placeholder="1hr 30min"
                      {...formik.getFieldProps('estimatedTime')}
                      error={formik.touched.estimatedTime && Boolean(formik.errors.estimatedTime)}
                      helperText={formik.touched.estimatedTime && formik.errors.estimatedTime}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Category"
                      variant="outlined"
                      placeholder="Normal"
                      {...formik.getFieldProps('category')}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Calories per portion"
                      variant="outlined"
                      placeholder="400"
                      {...formik.getFieldProps('caloriesPerPortion')}
                      error={formik.touched.caloriesPerPortion && Boolean(formik.errors.caloriesPerPortion)}
                      helperText={formik.touched.caloriesPerPortion && formik.errors.caloriesPerPortion}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Amount of portions"
                      variant="outlined"
                      placeholder="2"
                      {...formik.getFieldProps('amountOfPortions')}
                      error={formik.touched.amountOfPortions && Boolean(formik.errors.amountOfPortions)}
                      helperText={formik.touched.amountOfPortions && formik.errors.amountOfPortions}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <input accept="image/*" type="file" id="image" onChange={handleFileChange} />
                    {formik.touched.image && formik.errors.image && (
                      <Typography variant="subtitle1" color={bloodyRed} fontWeight="bold">
                        {formik.errors.image}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} display="flex" justifyContent="right">
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
            <Box position="relative" bottom="0" pb={2} width="90%">
              <Flex justifyContent="right">
                <Button variant="outlined" href="/recipes">
                  All recipes
                </Button>
              </Flex>
            </Box>
          </Paper>
        </Flex>
      </PageContent>
      <Snackbar open={addRecipe.isSuccess} message="Successfully added recipe!" autoHideDuration={5000} />
    </>
  );
};

export default AddRecipePage;
