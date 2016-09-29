import React, { Component, PropTypes } from 'react';

class PropInput extends Component {
  constructor(props, context) {
    super();
    let { name } = props;
    let { getFieldProp } = context;
    this.state = {
      value: getFieldProp(name),
    };
    this.onFieldChange = this._onFieldChange.bind(this);
  }

  _onFieldChange(e) {
    this.setState({
      value: e.target.value,
    }, () => {
      let { name } = this.props;
      this.context.setFieldProp(name, this.state.value);
      this.context.setDirty(true);
    });
  }

  render() {
    let { label, type } = this.props;
    let { value } = this.state;

    return (
      <div className="form-group">
        <label>{label}</label>
        {type === 'textarea' ? (
          <textarea
            className="form-control"
            onChange={this.onFieldChange}
            value={value}
          />
        ) : (
          <input
            className="form-control"
            onChange={this.onFieldChange}
            value={value}
          />
        )}
      </div>
    );
  }
}

PropInput.defaultProps = {
  type: 'text',
};

PropInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

PropInput.contextTypes = {
  setDirty: PropTypes.func.isRequired,
  setFieldProp: PropTypes.func.isRequired,
  getFieldProp: PropTypes.func.isRequired,
};

export default PropInput;
