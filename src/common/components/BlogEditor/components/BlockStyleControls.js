import React from 'react';
import ControlButton from './ControlButton';
import { BLOCK_STYLES } from '../constants';

let BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <span className="blogEditor-editorControls">
      {BLOCK_STYLES.map((type) =>
        <ControlButton
          key={type.label}
          label={type.label}
          style={type.style}
          onToggle={onToggle}
          active={type.style === blockType}
        />
      )}
    </span>
  );
};

export default BlockStyleControls;
