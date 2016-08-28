import React from 'react';
import Head from '../Head';

const AppLayout = ({ children }) => (
  <div>
    <Head
      title="Go Creating"
      metas={[
        {charset: 'utf-8'},
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ]}
      links={[
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
      ]}
      scripts={[
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
      ]}
    />
    {children}
  </div>
);

export default AppLayout;
