import React, { Component, PropTypes } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToMarkdown } from 'draft-js-export-markdown';
import MDReactComponent from 'markdown-react-js';
import blogAPI from '../../../api/blog';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.handleEditBtnClick = this._handleEditBtnClick.bind(this);
    this.handleRemoveBtnClick = this._handleRemoveBtnClick.bind(this);
    this.state = {
      blog: {},
      markdown: '',
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
          let contentState = convertFromRaw(json.blog.rawContent);
          this.setState({
            blog: json.blog,
            markdown: stateToMarkdown(contentState),
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
    let { blog, markdown } = this.state;
    let { token } = this.context.store.getState().cookie;
    let isAuth = !!token;

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
          <h1>{blog.title}</h1>
          <MDReactComponent text={markdown} />
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
