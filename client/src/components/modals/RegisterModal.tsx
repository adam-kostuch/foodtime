import * as yup from 'yup';
import { useFormik } from 'formik';
import { midnightDark, pumpkinOrange } from '@foodtime/utils/colors';
import { Actions, Flex, TextField, Typography } from '@foodtime/components';
import { Box, Button, Dialog, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import { useRegister } from '@foodtime/hooks';
import { useState } from 'react';

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal = ({ isOpen, ...rest }: RegisterModalProps) => {
  const register = useRegister();

  return (
    <>
      <Dialog open={isOpen} sx={{ borderRadius: 4 }}>
        <RegisterModalContent {...rest} register={register} />
      </Dialog>
      <Snackbar open={register.isSuccess} message="Register successful!" autoHideDuration={5000} />
    </>
  );
};

export default RegisterModal;

type RegisterModalContentProps = Omit<RegisterModalProps, 'isOpen'> & { register: ReturnType<typeof useRegister> };

const RegisterModalContent = ({ onClose, register }: RegisterModalContentProps) => {
  const [permissionLevel, setPermissionLevel] = useState<1 | 2>(1);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await register.mutateAsync({ ...values, permissionLevel });

      onClose();
    },
  });

  return (
    <>
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
            Sign up!
          </Typography>
          <Typography>Join our amazing community and create your own recipes!</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Flex justifyContent="space-between" mt={4}>
              <Button
                variant="text"
                onClick={() => setPermissionLevel((prevLevel) => (prevLevel === 1 ? 2 : 1))}
                sx={{ color: midnightDark }}
              >
                Admin
              </Button>
              <Actions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Actions>
            </Flex>
          </form>
        </DialogContent>
      </Box>
    </>
  );
};
