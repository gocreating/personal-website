import React from 'react';
import PageLayout from '../layouts/PageLayout';

const NotFoundPage = (props) => (
  <PageLayout>
    <section>
      <div className="row">
        <div className="col-lg-12">
          <h1>頁面不存在</h1>
          <p>您所查詢的頁面不存在。</p>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default NotFoundPage;
