import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import PageLayout from '../../../layouts/PageLayout';
import PostForm from '../../../forms/PostForm';

class NewPage extends Component {
  componentDidMount() {
    let { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
    let { form } = this.context.store.getState();
    if (form.post && form.post.content.touched) {
      return '確定離開?';
    }
  }

  render() {
    return (
      <PageLayout>
        <PostForm ref="postForm" />
      </PageLayout>
    );
  }
}

NewPage.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default withRouter(NewPage);
