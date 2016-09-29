import React from 'react';
import { Entity } from 'draft-js';
import classnames from 'classnames';
import { EntityTypes } from '../constants';
import getEntityAtCursor from '../utils/getEntityAtCursor';
import EditLink from './EditLink';
import EditImage from './EditImage';

let MediaControls = ({
  editorState,
  onLinkBtnClick,
  onRemoveLinkBtnClick,
  onImageBtnClick,
}) => {
  let entityAtCursor = getEntityAtCursor(editorState);
  let entityKey = entityAtCursor && entityAtCursor.entityKey;
  let entity = entityKey && Entity.get(entityKey);
  let isLinkEntity = (entity != null && entity.type === EntityTypes.LINK);
  let isImageEntity = (entity != null && entity.type === EntityTypes.IMAGE);

  return (
    <span className="blogEditor-editorControls">
      <span
        className={classnames(
          'blogEditor-controlButton',
          {'active': isLinkEntity}
        )}
        onClick={onLinkBtnClick}
      >
        Link
      </span>
      <span
        className={classnames(
          'blogEditor-controlButton',
          {'active': isLinkEntity}
        )}
        onClick={onRemoveLinkBtnClick}
      >
        Remove Link
      </span>
      {isLinkEntity && <EditLink entityKey={entityKey} />}
      <span
        className={classnames(
          'blogEditor-controlButton',
          {'active': isImageEntity}
        )}
        onClick={onImageBtnClick}
      >
        Image
      </span>
      {isImageEntity && <EditImage entityKey={entityKey} />}
    </span>
  );
};

export default MediaControls;
