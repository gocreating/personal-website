import React, { Component, PropTypes } from 'react';
import redraft from 'redraft';
import blogAPI from '../../../api/blog';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';
import renderer from '../../BlogEditor/renderer';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.handleEditBtnClick = this._handleEditBtnClick.bind(this);
    this.handleRemoveBtnClick = this._handleRemoveBtnClick.bind(this);
    this.state = {
      blog: {},
    };
  }

  componentDidMount() {
    blogAPI(this.context.store.getState().apiEngine)
      .read(this.props.params.slug)
      .catch((err) => {
        alert('Read blog error');
        throw err;
      })
      .then((json) => {
        if (json.blog) {
          this.setState({
            blog: json.blog,
          });
        }
      });
  }

  _handleEditBtnClick() {
    this.context.router.push(`/blog/${this.props.params.slug}/edit`);
  }

  _handleRemoveBtnClick() {
    blogAPI(this.context.store.getState().apiEngine)
      .remove(this.props.params.slug)
      .catch((err) => {
        alert('Remove blog error');
        throw err;
      })
      .then((json) => {
        this.context.router.push('/blog');
      });
  }

  render() {
    let { blog } = this.state;
    let { token } = this.context.store.getState().cookie;
    let isAuth = !!token;
    let rendered = redraft(blog.rawContent, renderer);

    return (
      <PageLayout>
        <Container>
          {isAuth && (
            <button
              className="btn btn-warning"
              type="button"
              onClick={this.handleEditBtnClick}
            >
              編輯
            </button>
          )}
          {isAuth && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.handleRemoveBtnClick}
            >
              刪除
            </button>
          )}
          <div style={{fontSize: 80, margin: '50px 0', textAlign: 'center'}}>
            {blog.title}
          </div>
          {rendered}
          <div style={{height: 100}} />
        </Container>
      </PageLayout>
    );
  }
}

ShowPage.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.any.isRequired,
};

export default ShowPage;
