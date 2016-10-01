import React, { PropTypes } from 'react';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

let {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
} = ShareButtons;
let FacebookIcon = generateShareIcon('facebook');
let TwitterIcon = generateShareIcon('twitter');
let GooglePlusIcon = generateShareIcon('google');

let SocialPanel = ({ title, url, size, style, ...rest }) => {
  if (process.env.BROWSER) {
    url = url || window.location.href;
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 'auto',
        padding: 5,
        borderRadius: '0 5px 5px 0',
        boxShadow: '0 0 10px #777',
        backgroundColor: '#efefef',
        ...style,
      }}
      {...rest}
    >
      <FacebookShareButton title={title} url={url}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={size} />
      </TwitterShareButton>
      <GooglePlusShareButton title={title} url={url}>
        <GooglePlusIcon size={size} />
      </GooglePlusShareButton>
    </div>
  );
};

SocialPanel.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.number,
};

SocialPanel.defaultProps = {
  title: '',
  url: '',
  size: 32,
};

export default SocialPanel;
