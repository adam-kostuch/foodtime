import { midnightDark, pumpkinOrange } from '@foodtime/utils/colors';
import { Actions, Flex, Typography } from '@foodtime/components';
import { Box, Button, Dialog, DialogActions, DialogTitle, Snackbar } from '@mui/material';
import { useFoodtimeContext } from '@foodtime/FoodtimeContextProvider';
import { useLogout } from '@foodtime/hooks';

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LogoutModal = ({ isOpen, ...rest }: LogoutModalProps) => {
  const { isAuthenticated } = useFoodtimeContext();

  return (
    <>
      <Dialog open={isOpen} sx={{ borderRadius: 2 }}>
        <LogoutModalContent {...rest} />
      </Dialog>
      <Snackbar open={!isAuthenticated} message="Successfully logged out!" autoHideDuration={5000} />
    </>
  );
};

export default LogoutModal;

type LoginModalContentProps = Omit<LogoutModalProps, 'isOpen'>;

const LogoutModalContent = ({ onClose }: LoginModalContentProps) => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
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
          Sign out!
        </Typography>
        <Typography>See you soon! I hope you enjoyed stay here.</Typography>
      </DialogTitle>
      <DialogActions>
        <Flex justifyContent="right" mt={4}>
          <Actions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleLogout}>
              Log out
            </Button>
          </Actions>
        </Flex>
      </DialogActions>
    </Box>
  );
};
