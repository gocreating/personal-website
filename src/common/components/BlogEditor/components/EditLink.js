import React from 'react';
import PropsFormPanel from './PropsFormPanel';
import PropInput from './PropInput';

let EditLink = ({ entityKey }) => (
  <PropsFormPanel
    entityKey={entityKey}
    title="超連結"
  >
    <PropInput
      label="URL"
      name="url"
    />
  </PropsFormPanel>
);

export default EditLink;
