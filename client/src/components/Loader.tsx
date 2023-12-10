import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{ position: 'absolute', top: '40%', left: '45%' }}>
      <CircularProgress size={160} color="secondary" />
    </Box>
  );
};

export default Loader;
