import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';

const ListPage = (props) => (
  <PageLayout>
    <section>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <h1>部落格</h1>
            <p>尚無文章</p>
          </div>
        </div>
      </Container>
    </section>
  </PageLayout>
);

export default ListPage;
