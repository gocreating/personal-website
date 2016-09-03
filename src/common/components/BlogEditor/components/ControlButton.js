import React, { Component } from 'react';
import classnames from 'classnames';

class ControlButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let { active } = this.props;

    return (
      <span
        className={classnames(
          'blogEditor-controlButton',
          {'active': active}
        )}
        onMouseDown={this.onToggle}
      >
        {this.props.label}
      </span>
    );
  }
}

export default ControlButton;
