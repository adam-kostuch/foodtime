import { createTheme } from '@mui/material';
import * as colors from '@foodtime/utils/colors';

export const theme = createTheme({
  palette: {
    common: {
      black: colors.pumpkinOrange,
    },
    primary: {
      main: colors.midnightDark,
      dark: colors.spookyGrey,
      light: colors.sundownYellow,
      contrastText: colors.dirtyWhite,
    },
    secondary: {
      main: colors.dirtyWhite,
      dark: colors.pumpkinOrange,
      light: colors.sundownYellow,
      contrastText: colors.dirtyWhite,
    },
    action: {
      active: colors.pumpkinOrange,
      disabled: colors.dirtyWhite,
      disabledBackground: colors.spookyGrey,
    },
    error: {
      main: colors.bloodyRed,
      light: colors.oakBrown,
      dark: colors.rustyBrown,
      contrastText: colors.dirtyWhite,
    },
    warning: {
      dark: colors.pumpkinOrange,
      light: colors.sundownYellow,
      main: colors.oakBrown,
    },
    info: {
      dark: colors.spookyGrey,
      light: colors.dirtyWhite,
      main: colors.pumpkinOrange,
    },
    success: {
      dark: colors.autumnGreen,
      light: colors.dirtyWhite,
      main: colors.oakBrown,
    },
    text: {
      primary: colors.dirtyWhite,
      secondary: colors.pumpkinOrange,
      disabled: colors.spookyGrey,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: colors.midnightDark,
            backgroundColor: colors.dirtyWhite,
            ':hover': { backgroundColor: colors.pumpkinOrange },
            ':active': { backgroundColor: colors.pumpkinOrange },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: colors.dirtyWhite,
            borderColor: colors.dirtyWhite,
            '&:hover': {
              borderColor: colors.pumpkinOrange,
              color: colors.pumpkinOrange,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: { color: colors.pumpkinOrange },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        style: { color: colors.pumpkinOrange },
      },
    },
  },
});
