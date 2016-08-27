import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';

const PageLayout = ({ children, ...rest }) => (
  <div>
    <Navigation />
    {children}
    <Footer />
  </div>
);

export default PageLayout;
