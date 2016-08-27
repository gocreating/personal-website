import React from 'react';
import Navigation from '../Navigation';
import Container from '../main/Container';
import Footer from '../Footer';

const PageLayout = ({ children, ...rest }) => (
  <div>
    <Navigation />
    <Container {...rest}>
      {children}
    </Container>
    <Footer />
  </div>
);

export default PageLayout;
