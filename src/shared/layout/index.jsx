import { Container } from '@mui/material';
import React, { Fragment } from 'react';
import LayoutHeader from './header';
import ScrollTop from './scroll-top';

const Layout = ({ children }) => {
  console.log('route render')
  return (
    <Fragment>
      <LayoutHeader />
      <ScrollTop />
      <Container sx={{
        padding: { xs: 0, md: 4 },
      }}>{children}</Container>
    </Fragment>
  );
};

export default Layout;
