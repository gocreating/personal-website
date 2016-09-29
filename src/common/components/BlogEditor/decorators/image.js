import React from 'react';
import { Entity } from 'draft-js';
import { EntityTypes } from '../constants';

let Image = (props) => {
  let { url } = Entity.get(props.entityKey).getData();
  return (
    <img src={url} className="img-thumbnail" />
  );
};

let findImageEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === EntityTypes.IMAGE
    );
  }, callback);
};

export default {
  strategy: findImageEntities,
  component: Image,
};
