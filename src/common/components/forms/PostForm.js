import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import FormTypes from '../../constants/FormTypes';
import blogAPI from '../../api/blog';
import Container from '../main/Container';
import Section from '../Section';
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

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.save = this._save.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    let { type, routerParams, initializeForm } = this.props;

    if (type === FormTypes.UPDATE) {
      blogAPI(this.context.store.getState().apiEngine)
        .post()
        .read(routerParams.slug)
        .catch((err) => {
          alert('Read post fail');
          throw err;
        })
        .then((json) => {
          initializeForm({
            title: json.post.title,
          });
          this.refs.blogEditor.setRawContent(json.post.rawContent);
        });
    }
  }

  _save() {
    let { routerParams } = this.props;
    let { apiEngine, form } = this.context.store.getState();
    let rawContent = this.refs.blogEditor.getRawContent();

    return blogAPI(apiEngine)
      .post()
      .update(routerParams.slug, {
        title: form.post.title.value,
        rawContent,
      })
      .catch((err) => {
        alert('Update post fail');
        throw err;
      });
  }

  _handleSubmit(formData) {
    let { type, routerParams } = this.props;
    let rawContent = this.refs.blogEditor.getRawContent();

    if (type === FormTypes.CREATE) {
      blogAPI(this.context.store.getState().apiEngine)
        .post()
        .create({
          title: formData.title,
          rawContent,
        })
        .catch((err) => {
          alert('Create post fail');
          throw err;
        })
        .then((json) => {
          this.context.router.push(`/blog/post/${json.post.slug}`);
        });
    } else if (type === FormTypes.UPDATE) {
      this.save().then((json) => {
        this.context.router.push(`/blog/post/${routerParams.slug}`);
      });
    }
  }

  render() {
    const {
      type,
      routerParams,
      fields: { title },
      handleSubmit,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Section
          style={{
            backgroundColor: 'rgb(235,239,242)',
          }}
        >
          <Container>
            <div className="btn-group" role="group">
              <button
                className="btn btn-default"
                type="submit"
              >
                {type === FormTypes.CREATE ? '發佈' : '更新'}
              </button>
              {type === FormTypes.UPDATE && (
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={() => this.save()}
                >
                  儲存
                </button>
              )}
              <button
                className="btn btn-default"
                type="button"
                onClick={() => this.refs.blogEditor.logState()}
              >
                Log State
              </button>
            </div>
            {type === FormTypes.CREATE && (
              <div className="btn-group pull-right" role="group">
                <Link
                  to="/blog/post"
                  className="btn btn-link"
                >
                  取消
                </Link>
              </div>
            )}
            {type === FormTypes.UPDATE && (
              <div className="btn-group pull-right" role="group">
                <Link
                  to={`/blog/post/${routerParams.slug}`}
                  className="btn btn-link"
                  target="_blank"
                >
                  檢視
                </Link>
                <Link
                  to={`/blog/post/${routerParams.slug}`}
                  className="btn btn-link"
                >
                  取消
                </Link>
              </div>
            )}
          </Container>
        </Section>
        <Section>
          <Container>
            <Input
              type="text"
              placeholder="標題"
              style={{
                fontSize: 80,
                textAlign: 'center',
                height: 'auto',
              }}
              field={title}
            />
            <BlogEditor ref="blogEditor" />
          </Container>
        </Section>
      </Form>
    );
  }
};

PostForm.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.any.isRequired,
};

PostForm.propTypes = {
  type: PropTypes.oneOf([FormTypes.CREATE, FormTypes.UPDATE]).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  routerParams: PropTypes.object,
};

PostForm.defaultProps = {
  type: FormTypes.CREATE,
};

export default reduxForm({
  form: 'post',
  fields: [
    'title',
  ],
  validate,
})(PostForm);
