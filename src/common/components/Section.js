import React from 'react';
import cx from 'classnames';

export default ({ className, style, children, ...rest }) => (
  <div
    className={cx('container-fluid', className)}
    style={{
      padding: '20px 0',
      ...style,
    }}
  >
    {children}
  </div>
);
