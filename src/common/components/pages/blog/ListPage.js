import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  render() {
    let { blogs } = this.state;

    return (
      <PageLayout>
        <section>
          <Container>
            <div className="row">
              <div className="col-lg-12">
                {blogs.length > 0 ? (
                  <ul>
                    {blogs.map((blog) => (
                      <li key={blog.slug}>
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>尚無文章</p>
                )}
              </div>
            </div>
          </Container>
        </section>
      </PageLayout>
    );
  }
}

ListPage.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default ListPage;
