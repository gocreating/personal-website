import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';
import BlogForm from '../../forms/BlogForm';

const NewPage = (props) => (
  <PageLayout>
    <section>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <BlogForm />
          </div>
        </div>
      </Container>
    </section>
  </PageLayout>
);

export default NewPage;
