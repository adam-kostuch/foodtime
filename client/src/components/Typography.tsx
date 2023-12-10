import { ReactNode } from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

type FoodtimeTypographyProps = TypographyProps & {
  children: ReactNode;
};

const Typography = ({ children, ...props }: FoodtimeTypographyProps) => {
  return (
    <MuiTypography fontFamily="Kanit" {...props}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
