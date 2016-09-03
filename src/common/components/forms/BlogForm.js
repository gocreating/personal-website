import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormTypes from '../../constants/FormTypes';
import blogAPI from '../../api/blog';
import Form from '../main/Form';
import Input from '../reduxForm/Input';
import BlogEditor from '../BlogEditor';

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  return errors;
};

class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    let { type, routerParams, initializeForm } = this.props;

    if (type === FormTypes.UPDATE) {
      blogAPI(this.context.store.getState().apiEngine)
        .read(routerParams.slug)
        .catch((err) => {
          alert('Read blog fail');
          throw err;
        })
        .then((json) => {
          initializeForm({
            title: json.blog.title,
          });
          this.refs.blogEditor.setRawContent(json.blog.rawContent);
        });
    }
  }

  _handleSubmit(formData) {
    let { type, routerParams } = this.props;
    let rawContent = this.refs.blogEditor.getRawContent();

    if (type === FormTypes.CREATE) {
      blogAPI(this.context.store.getState().apiEngine)
        .create({
          title: formData.title,
          rawContent,
        })
        .catch((err) => {
          alert('Create blog fail');
          throw err;
        })
        .then((json) => {
          this.context.router.push(`/blog/${json.blog.slug}`);
        });
    } else if (type === FormTypes.UPDATE) {
      blogAPI(this.context.store.getState().apiEngine)
        .update(routerParams.slug, {
          title: formData.title,
          rawContent,
        })
        .catch((err) => {
          alert('Update blog fail');
          throw err;
        })
        .then((json) => {
          this.context.router.push(`/blog/${routerParams.slug}`);
        });
    }
  }

  render() {
    const {
      type,
      fields: { title },
      handleSubmit,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Button
          onClick={() => this.refs.blogEditor.logState()}
          type="button"
          title="Log State"
        />
        <Form.Button
          type="submit"
          title={type === FormTypes.CREATE ? '發佈' : '更新'}
        />
        <Input
          type="text"
          placeholder="標題"
          field={title}
        />
        <BlogEditor ref="blogEditor" />
      </Form>
    );
  }
};

BlogForm.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.any.isRequired,
};

BlogForm.propTypes = {
  type: PropTypes.oneOf([FormTypes.CREATE, FormTypes.UPDATE]).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  routerParams: PropTypes.object,
};

BlogForm.defaultProps = {
  type: FormTypes.CREATE,
};

export default reduxForm({
  form: 'blog',
  fields: [
    'title',
  ],
  validate,
})(BlogForm);
