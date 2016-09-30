import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import FormTypes from '../../constants/FormTypes';
import blogAPI from '../../api/blog';
import Container from '../main/Container';
import Section from '../Section';
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
    this.submit = this._submit.bind(this);
    this.save = this._save.bind(this);
    this.onEditorChange = this._onEditorChange.bind(this);
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

  isFormDirty() {
    let { dirty } = this.props;
    let { store } = this.context;
    let postForm = store.getState().form.post;

    return dirty || (
      postForm &&
      postForm.content &&
      postForm.content.touched
    );
  }

  _submit() {
    let { type, routerParams, untouchAll } = this.props;

    if (type === FormTypes.CREATE) {
      let { apiEngine, form } = this.context.store.getState();
      let rawContent = this.refs.blogEditor.getRawContent();
      blogAPI(apiEngine)
        .post()
        .create({
          title: form.post.title.value,
          rawContent,
        })
        .catch((err) => {
          alert('Create post fail');
          throw err;
        })
        .then((json) => {
          untouchAll();
          this.context.router.push(`/blog/post/${json.post.slug}`);
        });
    } else if (type === FormTypes.UPDATE) {
      this.save().then((json) => {
        this.context.router.push(`/blog/post/${routerParams.slug}`);
      });
    }
  }

  _save() {
    let { routerParams, untouchAll } = this.props;
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
      })
      .then((json) => {
        untouchAll();
      });
  }

  _onEditorChange() {
    this.props.touch('content');
  }

  render() {
    const {
      type,
      routerParams,
      fields: { title },
    } = this.props;
    let isFormDirty = this.isFormDirty();

    return (
      <div>
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
                disabled={!isFormDirty}
                onClick={() => this.submit()}
              >
                {type === FormTypes.CREATE ? '發佈' : '更新'}
              </button>
              {type === FormTypes.UPDATE && (
                <button
                  className="btn btn-default"
                  type="button"
                  disabled={!isFormDirty}
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
            <BlogEditor
              ref="blogEditor"
              onChange={this.onEditorChange}
            />
          </Container>
        </Section>
      </div>
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
  routerParams: PropTypes.object,
};

PostForm.defaultProps = {
  type: FormTypes.CREATE,
};

export default reduxForm({
  form: 'post',
  fields: [
    'title',
    'content',
  ],
  validate,
})(PostForm);
