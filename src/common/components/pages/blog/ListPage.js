import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const ListPage = (props) => (
  <PageLayout>
    <Row>
      <Col lg={12}>
        <h1>部落格</h1>
        <p>尚無文章</p>
      </Col>
    </Row>
  </PageLayout>
);

export default ListPage;
