import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';
import PageHeader from '../../main/PageHeader';
import LoginForm from '../../forms/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <Container>
      <PageHeader title="Login" />
      <LoginForm location={props.location} />
    </Container>
  </PageLayout>
);

export default LoginPage;
