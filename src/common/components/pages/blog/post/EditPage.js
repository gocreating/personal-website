import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import FormTypes from '../../../../constants/FormTypes';
import PageLayout from '../../../layouts/PageLayout';
import PostForm from '../../../forms/PostForm';

class UpdatePage extends Component {
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
    let { params } = this.props;

    return (
      <PageLayout>
        <PostForm
          type={FormTypes.UPDATE}
          routerParams={params}
        />
      </PageLayout>
    );
  }
}

UpdatePage.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default withRouter(UpdatePage);
