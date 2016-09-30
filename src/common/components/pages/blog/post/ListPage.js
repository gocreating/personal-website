import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';
import { setPosts } from '../../../../actions/blogActions';
import PageLayout from '../../../layouts/PageLayout';
import Section from '../../../Section';
import Container from '../../../main/Container';
import Time from '../../../Time';
import blogAPI from '../../../../api/blog';

class ListPage extends Component {
  constructor() {
    super();
    this.state = {
      column: 1,
    };
  }

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

  abstractToComponents(abstract) {
    let lines = abstract.split('\n');
    let lastIndex = lines.length - 1;
    return lines.map((line, index) => (
      index === lastIndex ? line : [line, <br />]
    ));
  }

  renderToolbar() {
    let { column } = this.state;
    let cxBtnOfColumn = (c) => (
      cx('btn btn-default', {active: c === column})
    );

    return (
      <div className="visible-md visible-lg btn-group pull-right">
        <button
          type="button"
          className={cxBtnOfColumn(1)}
          onClick={() => this.setState({ column: 1 })}
        >
          <i className="fa fa-th-list" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={cxBtnOfColumn(2)}
          onClick={() => this.setState({ column: 2 })}
        >
          <i className="fa fa-th-large" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={cxBtnOfColumn(3)}
          onClick={() => this.setState({ column: 3 })}
        >
          <i className="fa fa-th" aria-hidden="true" />
        </button>
      </div>
    );
  }

  render() {
    let { blog: { posts } } = this.props;
    let { column } = this.state;

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
        </Section>
      </PageLayout>
    );
  }
}

export default connect(state => ({
  apiEngine: state.apiEngine,
  blog: state.blog,
}))(ListPage);
