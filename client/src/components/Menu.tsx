import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Actions, LoginModal, LogoutModal, RegisterModal } from '@foodtime/components';

const Menu = () => {
  return (
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button variant="text" href="/">
            <Typography variant="h6">Foodtime</Typography>
          </Button>
          <ActionButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;

const ActionButton = () => {
  const {
    isRegisterModalOpen,
    isLoginModalOpen,
    isLogoutModalOpen,
    setIsLoginModalOpen,
    setIsLogoutModalOpen,
    setIsRegisterModalOpen,
    isAuthenticated,
  } = useFoodtimeContext();

  if (isAuthenticated) {
    return (
      <>
        <Button variant="contained" onClick={() => setIsLogoutModalOpen(true)}>
          Logout
        </Button>
        <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <Actions>
        <Button variant="contained" onClick={() => setIsRegisterModalOpen(true)}>
          Register
        </Button>
        <Button variant="outlined" onClick={() => setIsLoginModalOpen(true)}>
          Login
        </Button>
      </Actions>
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};
