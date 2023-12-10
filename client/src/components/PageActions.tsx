import { Box } from '@mui/material';
import { ReactNode } from 'react';

type PageActionsProps = {
  children: ReactNode;
};

const PageActions = ({ children }: PageActionsProps) => {
  return <Box>{children}</Box>;
};

export default PageActions;
