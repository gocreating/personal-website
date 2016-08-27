import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';
import ReactDisqusThread from 'react-disqus-thread';

const HomePage = (props) => (
  <PageLayout>
    <section>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <h1>Go Creating</h1>
            <p>去創造吧！</p>
            <ReactDisqusThread
              shortname="gocreating-personal-website"
              identifier="blablabla"
              title="Gocreating's Personal Site"
              url="https://gocreating.herokuapp.com/"
            />
          </div>
        </div>
      </Container>
    </section>
  </PageLayout>
);

export default HomePage;
