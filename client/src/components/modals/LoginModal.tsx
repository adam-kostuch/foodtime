import * as yup from 'yup';
import { useFormik } from 'formik';
import { midnightDark, pumpkinOrange } from '@foodtime/utils/colors';
import { Actions, Flex, TextField, Typography } from '@foodtime/components';
import { Box, Button, Dialog, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import { useLogin } from '@foodtime/hooks';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type LoginrModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, ...rest }: LoginrModalProps) => {
  const login = useLogin();

  return (
    <>
      <Dialog open={isOpen} sx={{ borderRadius: 2 }}>
        <LoginrModalContent {...rest} login={login} />
      </Dialog>
      <Snackbar open={login.isSuccess} message="Successfully logged in!" autoHideDuration={5000} />
    </>
  );
};

export default LoginModal;

type LoginModalContentProps = Omit<LoginrModalProps, 'isOpen'> & { login: ReturnType<typeof useLogin> };

const LoginrModalContent = ({ onClose, login }: LoginModalContentProps) => {
  const { setToken, setRole } = useFoodtimeContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      const { data: tokens } = await login.mutateAsync({
        email,
        password,
      });

      console.log({ tokens });

      setToken({ ...tokens });
      setRole((Number(tokens.user.permissionLevel) as 1 | 2) ?? 1);
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
            Sign in!
          </Typography>
          <Typography>Welcome back! We are glad to see you again.</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
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

            <Flex justifyContent="right" mt={4}>
              <Actions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Log in
                </Button>
              </Actions>
            </Flex>
          </form>
        </DialogContent>
      </Box>
    </>
  );
};
