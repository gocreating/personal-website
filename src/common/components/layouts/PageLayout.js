import React from 'react';
import Navigation from '../Navigation';
import Container from '../main/Container';

const PageLayout = ({ children, ...rest }) => (
  <div>
    <Navigation />
    <Container {...rest}>
      {children}
    </Container>
  </div>
);

export default PageLayout;
