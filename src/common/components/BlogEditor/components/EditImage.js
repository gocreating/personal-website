import React from 'react';
import PropsFormPanel from './PropsFormPanel';
import PropInput from './PropInput';

let EditImage = ({ entityKey }) => (
  <PropsFormPanel
    entityKey={entityKey}
    title="圖片"
  >
    <PropInput
      label="URL"
      name="url"
    />
  </PropsFormPanel>
);

export default EditImage;
