import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { dirtyWhite, pumpkinOrange, oakBrown } from '@foodtime/utils/colors';

const outlinedSelectors = ['& .MuiOutlinedInput-notchedOutline', '&:hover .MuiOutlinedInput-notchedOutline'];
const focusedOutlinedSelectors = ['& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline'];

const TextField = (props: TextFieldProps) => (
  <MuiTextField
    fullWidth
    margin="normal"
    InputProps={{ style: { color: dirtyWhite } }}
    InputLabelProps={{ style: { color: pumpkinOrange } }}
    sx={{
      [outlinedSelectors.join(',')]: {
        borderColor: oakBrown,
      },
      [focusedOutlinedSelectors.join(',')]: {
        borderColor: oakBrown,
      },
    }}
    {...props}
  />
);

export default TextField;
