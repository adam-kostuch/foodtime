import { Box } from '@mui/material';
import { ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
};

const Page = ({ children }: PageProps) => {
  return <Box sx={{ width: '100vw' }}>{children}</Box>;
};

export default Page;
