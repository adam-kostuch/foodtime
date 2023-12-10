import { ChangeEvent, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Container, Grid, Paper, Snackbar } from '@mui/material';
import { useUpdateRecipe, useAuthentication } from '@foodtime/hooks';
import { Flex, TextField, PageContent, Typography } from '@foodtime/components';
import { bloodyRed } from '@foodtime/utils/colors';
import { RECIPES_PAGE } from '@foodtime/utils/constants';
import { Buffer } from 'buffer';
import { DisplayRecipe, RawRecipe } from '@foodtime/types';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { useParams } from 'react-router-dom';
import { UpdateRecipePayload } from '@foodtime/services/FoodtimeApiClient/types';

type FormData = {
  title: string;
  ingredients: string;
  image: File | undefined;
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
  image: yup.mixed(),
  instructions: yup.string().required('Instructions are required'),
  notes: yup.string(),
  authorName: yup.string().required('Author Name is required'),
  estimatedTime: yup.string().required('Estimated time is required'),
  category: yup.string().required('Category is required'),
  caloriesPerPortion: yup.number().required('Calories per portion is required'),
  amountOfPortions: yup.number().required('Amount of portions is required'),
});

const UpdateRecipePage = () => {
  useAuthentication();
  const { client } = useFoodtimeContext();
  const { recipeId } = useParams();
  const updateRecipe = useUpdateRecipe();

  const rId = recipeId;
  const formik = useFormik({
    initialValues: {
      title: '',
      ingredients: '',
      image: undefined,
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
      let updatePayload: UpdateRecipePayload = {
        ...values,
        ingredients: ingredientsArray,
      };

      if (values.image !== null) {
        updatePayload = {
          ...updatePayload,
          image: values.image as File,
        };
      }

      await updateRecipe.mutateAsync(updatePayload);

      setTimeout(() => {
        window.location.href = `${RECIPES_PAGE}/${rId}`;
      }, 3000);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('image', event.currentTarget.files?.[0] ?? null);
  };

  useEffect(() => {
    if (formik.values.authorName === '') {
      const fetchRecipe = async () => {
        const { data }: { data: RawRecipe } = await client.getRecipe(recipeId as string);

        const image = `data:${data?.image?.contentType ?? ''};base64, ${Buffer.from(data?.image?.data ?? '').toString(
          'base64'
        )}`;
        return { ...data, image } as DisplayRecipe;
      };

      const fetchedRecipe = fetchRecipe();
      fetchedRecipe.then((r) => {
        formik.setValues({
          ...r,
          ingredients: r.ingredients.toString(),
          image: undefined,
        } as FormData);
      });
    }
  }, []);

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
                Update recipe!
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1} mb={4}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Title"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
                      {...formik.getFieldProps('title')}
                      error={formik.touched.authorName && Boolean(formik.errors.authorName)}
                      helperText={formik.touched.authorName && formik.errors.authorName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Author Name"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
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
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
                      {...formik.getFieldProps('ingredients')}
                      error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                      helperText={formik.touched.ingredients && formik.errors.ingredients}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Instructions"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
                      {...formik.getFieldProps('instructions')}
                      error={formik.touched.instructions && Boolean(formik.errors.instructions)}
                      helperText={formik.touched.instructions && formik.errors.instructions}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Notes"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      {...formik.getFieldProps('notes')}
                      error={formik.touched.notes && Boolean(formik.errors.notes)}
                      helperText={formik.touched.notes && formik.errors.notes}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Estimated Time"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
                      {...formik.getFieldProps('estimatedTime')}
                      error={formik.touched.estimatedTime && Boolean(formik.errors.estimatedTime)}
                      helperText={formik.touched.estimatedTime && formik.errors.estimatedTime}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Category"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
                      {...formik.getFieldProps('category')}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Calories Per Portion"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
                      {...formik.getFieldProps('caloriesPerPortion')}
                      error={formik.touched.caloriesPerPortion && Boolean(formik.errors.caloriesPerPortion)}
                      helperText={formik.touched.caloriesPerPortion && formik.errors.caloriesPerPortion}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Amount Of Portions"
                      InputLabelProps={{ shrink: true, color: 'info' }}
                      variant="outlined"
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
            <Box position="absolute" bottom="0" pb={4} width="90%">
              <Flex justifyContent="right">
                <Button variant="outlined" href="/recipes">
                  All recipes
                </Button>
              </Flex>
            </Box>
          </Paper>
        </Flex>
      </PageContent>
      <Snackbar open={updateRecipe.isSuccess} message="Successfully updated recipe!" autoHideDuration={5000} />
    </>
  );
};

export default UpdateRecipePage;
