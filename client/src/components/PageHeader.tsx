import { Box } from '@mui/material';
import { ReactNode } from 'react';

type PageHeaderProps = {
  children: ReactNode;
};

const Pageheader = ({ children }: PageHeaderProps) => {
  return <Box>{children}</Box>;
};

export default Pageheader;
