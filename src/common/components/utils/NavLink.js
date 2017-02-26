import React from 'react';
import activeComponent from 'react-router-active-component';

const NavLink = ({ children, active, activeKey, activeHref, ...rest }) => {
  const ActiveLink = activeComponent('li');
  return (
    <ActiveLink {...rest}>
      {children}
    </ActiveLink>
  );
};

export default NavLink;
