import React from 'react';
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react';

let Header = ({ blockProps: { level = 1 }, ...rest }) => (
  React.createElement(`h${level}`, {
    className: `post-header-level-${level}`,
  }, <DraftEditorBlock {...rest} />)
);

export default Header;
