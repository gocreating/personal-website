import React from 'react';
import ControlButton from './ControlButton';
import { INLINE_STYLES } from '../constants';

let InlineStyleControls = ({ editorState, onToggle }) => {
  let currentStyle = editorState.getCurrentInlineStyle();

  return (
    <span className="blogEditor-editorControls">
      {INLINE_STYLES.map(type =>
        <ControlButton
          key={type.label}
          label={type.label}
          style={type.style}
          onToggle={onToggle}
          active={currentStyle.has(type.style)}
        />
      )}
    </span>
  );
};

export default InlineStyleControls;
