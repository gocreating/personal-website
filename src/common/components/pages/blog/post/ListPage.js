import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setPosts } from '../../../../actions/blogActions';
import PageLayout from '../../../layouts/PageLayout';
import Container from '../../../main/Container';
import blogAPI from '../../../../api/blog';

class ListPage extends Component {
  componentDidMount() {
    let { blog: { isPostsFetched }, apiEngine, dispatch } = this.props;

    if (!isPostsFetched) {
      blogAPI(apiEngine)
        .post()
        .list()
        .catch((err) => {
          alert('List posts error');
          throw err;
        })
        .then((json) => dispatch(setPosts(json.posts)));
    }
  }

  render() {
    let { blog: { posts } } = this.props;

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

export default connect(state => ({
  apiEngine: state.apiEngine,
  blog: state.blog,
}))(ListPage);
