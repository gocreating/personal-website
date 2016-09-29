import React from 'react';
import { Entity } from 'draft-js';
import { EntityTypes } from '../constants';

let Link = (props) => {
  let { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url}>{props.children}</a>
  );
};

let findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === EntityTypes.LINK
    );
  }, callback);
};

export default {
  strategy: findLinkEntities,
  component: Link,
};
