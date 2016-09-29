import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import cx from 'classnames';
import Container from '../../main/Container';
import Section from '../../Section';

let style = {
  width: '100%',
  minHeight: 185,
  maxHeight: 200,
  position: 'fixed',
  left: 0,
  bottom: 0,
  backgroundColor: 'rgb(235,239,242)',
  zIndex: 999,
  boxShadow: '0px 0px 5px #999',
  overflowY: 'auto',
};

class PropsFormPanel extends Component {
  constructor(props) {
    super();
    let { entityKey } = props;
    let entity = entityKey && Entity.get(entityKey);
    let entityData = (entity && entity.getData()) || {};
    this.state = {
      isDirty: false,
      fieldProps: entityData,
    };
    this.onApplyBtnClick = this._onApplyBtnClick.bind(this);
    this.onPropsFormSubmit = this._onPropsFormSubmit.bind(this);
  }

  getChildContext() {
    return {
      setDirty: (isDirty) => {
        this.setState({ isDirty });
      },
      setFieldProp: (field, value) => {
        this.setState({
          fieldProps: {
            ...this.state.fieldProps,
            [field]: value,
          },
        });
      },
      getFieldProp: (field) => {
        return this.state.fieldProps[field];
      },
    };
  }

  _onApplyBtnClick(e) {
    this.setState({
      isDirty: false,
    }, () => {
      let { entityKey } = this.props;
      Entity.mergeData(entityKey, this.state.fieldProps);
    });
  }

  _onPropsFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.onApplyBtnClick();
  }

  render() {
    let { title = '', children } = this.props;
    let { isDirty } = this.state;

    return (
      <Section style={style}>
        <Container>
          <div className="row">
            <div className="col-md-12">
              <button
                className={
                  cx('btn btn-primary', {
                    'disabled': !isDirty,
                  })
                }
                type="button"
                onClick={this.onApplyBtnClick}
              >
                套用
              </button>
              <h4 className="text-right pull-right">{title}</h4>
            </div>
          </div>
          <form onSubmit={this.onPropsFormSubmit}>
            {children}
          </form>
        </Container>
      </Section>
    );
  }
};

PropsFormPanel.propTypes = {
  entityKey: PropTypes.string,
  title: PropTypes.string,
};

PropsFormPanel.childContextTypes = {
  setDirty: PropTypes.func,
  setFieldProp: PropTypes.func,
  getFieldProp: PropTypes.func,
};

export default PropsFormPanel;
