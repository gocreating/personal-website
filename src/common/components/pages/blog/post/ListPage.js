import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';
import { setPosts, setPage, setColumn } from '../../../../actions/blogActions';
import PageLayout from '../../../layouts/PageLayout';
import Section from '../../../Section';
import Container from '../../../main/Container';
import Time from '../../../Time';
import Pagination from '../../../Pagination';
import blogAPI from '../../../../api/blog';

function propsToPage(props) {
  return props.location.query.page || 1;
}

class ListPage extends Component {
  componentDidMount() {
    if (!this.props.cookie.column) {
      this.props.dispatch(setColumn(1));
    }
    if (!this.props.blog.isPostsFetched) {
      this.fetchPosts();
    }
  }

  componentDidUpdate(prevProps) {
    if (propsToPage(prevProps) !== propsToPage(this.props)) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    let { apiEngine, dispatch } = this.props;
    let page = propsToPage(this.props);

    blogAPI(apiEngine)
      .post()
      .list({ page })
      .catch((err) => {
        alert('List posts error');
        throw err;
      })
      .then((json) => {
        dispatch(setPosts(json.posts));
        dispatch(setPage(json.page));
        document.body.scrollTop = 0;
      });
  }

  abstractToComponents(abstract) {
    let lines = abstract.split('\n');
    let lastIndex = lines.length - 1;
    return lines.map((line, index) => (
      index === lastIndex ? line : [line, <br />]
    ));
  }

  renderToolbar() {
    let { dispatch } = this.props;
    let column = Number(this.props.cookie.column);
    let cxBtnOfColumn = (c) => (
      cx('btn btn-default', {active: c === column})
    );

    return (
      <div className="visible-md visible-lg btn-group pull-right">
        <button
          type="button"
          className={cxBtnOfColumn(1)}
          onClick={() => dispatch(setColumn(1))}
        >
          <i className="fa fa-th-list" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={cxBtnOfColumn(2)}
          onClick={() => dispatch(setColumn(2))}
        >
          <i className="fa fa-th-large" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={cxBtnOfColumn(3)}
          onClick={() => dispatch(setColumn(3))}
        >
          <i className="fa fa-th" aria-hidden="true" />
        </button>
      </div>
    );
  }

  render() {
    let {
      blog: { posts, page },
      cookie: { column },
    } = this.props;

    return (
      <PageLayout>
        <Section
          style={{
            backgroundColor: '#eee',
          }}
        >
          <Container>
            {this.renderToolbar()}
          </Container>
          <Container>
            <div className="row">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className={`col-md-${12 / column}`}
                  style={{margin: '20px 0'}}
                >
                  <div className="thumbnail">
                    <div className="caption" style={{padding: 60}}>
                      <h1 style={{marginBottom: 50}}>{post.title}</h1>
                      <p>
                        {this.abstractToComponents(post.abstract)}...
                        <Link to={`/blog/post/${post.slug}`}>繼續閱讀</Link>
                      </p>
                      <hr />
                      <span style={{color: '#aaa'}}>
                        <Time
                          format="YYYY-MM-DD"
                          value={post.createdAt}
                          relative
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
          <Container>
            <Pagination base="/blog/post" page={page} simple />
          </Container>
        </Section>
      </PageLayout>
    );
  }
}

export default connect(state => ({
  apiEngine: state.apiEngine,
  cookie: state.cookie,
  blog: state.blog,
}))(ListPage);
