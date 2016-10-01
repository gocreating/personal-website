import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import redraft from 'redraft';
import ReactDisqusThread from 'react-disqus-thread';
import { setPost } from '../../../../actions/blogActions';
import blogAPI from '../../../../api/blog';
import PageLayout from '../../../layouts/PageLayout';
import Container from '../../../main/Container';
import Section from '../../../Section';
import SocialPanel from '../../../SocialPanel';
import renderer from '../../../BlogEditor/renderer';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.handleEditBtnClick = this._handleEditBtnClick.bind(this);
    this.handleRemoveBtnClick = this._handleRemoveBtnClick.bind(this);
  }

  componentDidMount() {
    let { apiEngine, params, dispatch } = this.props;
    let post = this.getPost();

    if (!post || (post && !post.isFetched)) {
      blogAPI(apiEngine)
        .post()
        .read(params.slug)
        .catch((err) => {
          alert('Read post error');
          throw err;
        })
        .then((json) => dispatch(setPost(json.post)));
    }
  }

  getPost() {
    let { posts, params } = this.props;
    let post = posts.find((post) => post.slug === params.slug);
    return post;
  }

  _handleEditBtnClick() {
    this.context.router.push(`/blog/post/${this.props.params.slug}/edit`);
  }

  _handleRemoveBtnClick() {
    let { apiEngine, params } = this.props;

    if (confirm('確定刪除?')) {
      blogAPI(apiEngine)
        .post()
        .remove(params.slug)
        .catch((err) => {
          alert('Remove post error');
          throw err;
        })
        .then((json) => {
          this.context.router.push('/blog/post');
        });
    }
  }

  render() {
    let { cookie: { token } } = this.props;
    let isAuth = !!token;
    let post = this.getPost();
    let rendered = post && redraft(post.rawContent, renderer);
    let gap = (
      <div style={{height: 100}} />
    );

    return (
      <PageLayout>
        {isAuth && (
          <Section
            style={{
              backgroundColor: 'rgb(235,239,242)',
            }}
          >
            <Container>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={this.handleEditBtnClick}
                >
                  編輯
                </button>

                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={this.handleRemoveBtnClick}
                >
                  刪除
                </button>
              </div>
            </Container>
          </Section>
        )}
        <Container>
          {post && (
            <div style={{fontSize: 80, margin: '50px 0', textAlign: 'center'}}>
              {post.title}
            </div>
          )}
          {post && (
            <SocialPanel
              className="hidden-xs"
              title={post.title}
            />
          )}
          {rendered}
          {gap}
          {post && (
            <ReactDisqusThread
              shortname="gocreating-personal-website"
              identifier={post.slug}
              title={post.title}
            />
          )}
          {gap}
        </Container>
      </PageLayout>
    );
  }
}

ShowPage.contextTypes = {
  router: PropTypes.any.isRequired,
};

export default connect(state => ({
  apiEngine: state.apiEngine,
  cookie: state.cookie,
  posts: state.blog.posts,
}))(ShowPage);
