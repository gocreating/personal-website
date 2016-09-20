import React from 'react';
import FormTypes from '../../../constants/FormTypes';
import PageLayout from '../../layouts/PageLayout';
import BlogForm from '../../forms/BlogForm';

const UpdatePage = ({ params }) => (
  <PageLayout>
    <BlogForm type={FormTypes.UPDATE} routerParams={params} />
  </PageLayout>
);

export default UpdatePage;
