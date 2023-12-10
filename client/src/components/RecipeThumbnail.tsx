import { DisplayRecipe } from '@foodtime/types';
import { Flex, Typography } from '@foodtime/components';
import { Paper } from '@mui/material';

type RecipeThumbnailProps = {
  recipe: DisplayRecipe;
};

const RecipeThumbnail = ({ recipe }: RecipeThumbnailProps) => {
  return (
    <Paper
      elevation={10}
      onClick={() => (window.location.href = `/recipes/${recipe._id}`)}
      sx={{ backgroundColor: 'transparent', cursor: 'pointer', height: '25vh' }}
    >
      <Flex alignItems="stretch" flexWrap="wrap">
        <Flex justifyContent="center" alignItems="center" width="100%" height="20vh">
          <img src={recipe.image} alt={recipe.title} width="80%" style={{ maxHeight: '20vh' }} />
        </Flex>
        <Typography width="100%" textAlign="center">
          {recipe.title}
        </Typography>
      </Flex>
    </Paper>
  );
};
export default RecipeThumbnail;
