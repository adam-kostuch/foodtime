import { Box } from '@mui/material';
import { ReactNode } from 'react';

type PageContentProps = {
  children: ReactNode;
};

const PageContent = ({ children }: PageContentProps) => {
  return <Box sx={{ m: 3, height: '82vh' }}>{children}</Box>;
};

export default PageContent;
