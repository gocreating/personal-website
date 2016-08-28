import React, { Component, PropTypes } from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.handleEditBtnClick = this._handleEditBtnClick.bind(this);
    this.state = {
      blog: {},
    };
  }

  _handleEditBtnClick() {
    this.context.router.push(`/blog/${this.props.params.slug}/edit`);
  }

  render() {
    let { blog } = this.state;

    return (
      <PageLayout>
        <Container>
          <button
            className="btn btn-warning"
            type="button"
            onClick={this.handleEditBtnClick}
          >
            編輯
          </button>
          <button
            className="btn btn-danger"
            type="button"
          >
            刪除
          </button>
          <h1>{blog.title}</h1>
          <pre>{JSON.stringify(blog, null, 2)}</pre>
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
