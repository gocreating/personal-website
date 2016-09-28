import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PageLayout from '../../../layouts/PageLayout';
import Container from '../../../main/Container';
import blogAPI from '../../../../api/blog';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    if (!this.state.posts.length) {
      blogAPI(this.context.store.getState().apiEngine)
        .post()
        .list()
        .catch((err) => {
          alert('List posts error');
          throw err;
        })
        .then((json) => {
          this.setState({
            posts: json.posts,
          });
        });
    }
  }

  render() {
    let { posts } = this.state;

    return (
      <PageLayout>
        <section>
          <Container>
            <div className="row">
              <div className="col-lg-12">
                {posts.length > 0 ? (
                  <ul>
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <Link to={`/blog/post/${post.slug}`}>{post.title}</Link>
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
