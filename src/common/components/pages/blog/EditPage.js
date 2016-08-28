import React from 'react';
import FormTypes from '../../../constants/FormTypes';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';
import BlogForm from '../../forms/BlogForm';

const UpdatePage = ({ params }) => (
  <PageLayout>
    <section>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <BlogForm type={FormTypes.UPDATE} routerParams={params} />
          </div>
        </div>
      </Container>
    </section>
  </PageLayout>
);

export default UpdatePage;
