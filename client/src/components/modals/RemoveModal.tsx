import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Actions, Flex, TextField, Typography } from '@foodtime/components';
import { useRemoveRecipe } from '@foodtime/hooks';
import { pumpkinOrange, midnightDark } from '@foodtime/utils/colors';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const validationSchema = yup.object({
  id: yup.string().required('IDs do not match.'),
});

type RemoveModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RemoveModal = ({ isOpen, onClose }: RemoveModalProps) => {
  const { recipeId } = useParams();
  const removeRecipe = useRemoveRecipe();

  const formik = useFormik({
    initialValues: {
      id: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ id }) => {
      removeRecipe.mutateAsync(id);

      onClose();
      window.location.href = '/recipes';
    },
  });

  return (
    <Dialog open={isOpen} sx={{ borderRadius: 2 }}>
      <Box sx={{ backgroundColor: midnightDark }} px={3} py={1}>
        <DialogTitle textAlign="center">
          <Typography
            fontWeight="bold"
            textTransform="uppercase"
            fontStyle="italic"
            fontSize="1.5em"
            textAlign="center"
            color={pumpkinOrange}
          >
            Remove recipe!
          </Typography>
          <Typography>
            Are you sure you want to remove this recipe? Type{' '}
            <Typography component="span" fontWeight="bold" color={pumpkinOrange}>
              {recipeId ?? ''}
            </Typography>{' '}
            to remove.
          </Typography>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              label="Recipe ID"
              name="id"
              type="string"
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
          </DialogContent>
          <DialogActions>
            <Flex justifyContent="right" mt={4}>
              <Actions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" disabled={formik.values.id !== recipeId}>
                  Remove
                </Button>
              </Actions>
            </Flex>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default RemoveModal;
