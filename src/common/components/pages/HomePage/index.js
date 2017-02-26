import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const HomePage = (props) => (
  <PageLayout>
    <Row>
      <Col lg={12}>
        <h1>Go Creating</h1>
        <p>去創造吧！</p>
      </Col>
    </Row>
  </PageLayout>
);

export default HomePage;
