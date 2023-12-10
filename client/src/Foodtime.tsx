import { ReactNode } from 'react';
import { Footer, Menu, Page, PageActions, PageHeader } from '@foodtime/components';

const Foodtime = ({ children }: { children: ReactNode }) => {
  return (
    <Page>
      <PageHeader>
        <Menu />
      </PageHeader>
      {children}
      <PageActions>
        <Footer />
      </PageActions>
    </Page>
  );
};

export default Foodtime;
