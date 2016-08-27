import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';

const HomePage = (props) => (
  <PageLayout>
    <section>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <h1>Go Creating</h1>
            <p>去創造吧！</p>
          </div>
        </div>
      </Container>
    </section>
  </PageLayout>
);

export default HomePage;
