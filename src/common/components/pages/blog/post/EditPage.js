import React from 'react';
import FormTypes from '../../../../constants/FormTypes';
import PageLayout from '../../../layouts/PageLayout';
import PostForm from '../../../forms/PostForm';

const UpdatePage = ({ params }) => (
  <PageLayout>
    <PostForm type={FormTypes.UPDATE} routerParams={params} />
  </PageLayout>
);

export default UpdatePage;
