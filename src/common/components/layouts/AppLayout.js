import React from 'react';
import { connect } from 'react-redux';
import Head from '../Head';
import Navigation from '../Navigation';

const AppLayout = ({ cookie, children }) => (
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
        '/css/main.css',
      ]}
      scripts={[
        // jscs:disable
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
        // jscs:enable
      ]}
    />
    <Navigation cookie={cookie} />
    {children}
  </div>
);

export default connect(state => state)(AppLayout);
