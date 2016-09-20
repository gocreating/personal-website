import React from 'react';
import { EntityTypes } from './constants';

// ref: <https://github.com/lokiuz/redraft>
// just a helper to add a <br /> after a block
let addBreaklines = (children) => children.map(child => [child, <br />]);

export default {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    BOLD: (children) => <strong>{children}</strong>,
    ITALIC: (children) => <em>{children}</em>,
    UNDERLINE: (children) => <u>{children}</u>,
    CODE: (children) => <span>{children}</span>,
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'header-level-1': (children) => (
      children.map(child => <h1 className="post-header-level-1">{child}</h1>)
    ),
    'header-level-2': (children) => (
      children.map(child => <h2 className="post-header-level-2">{child}</h2>)
    ),
    'header-level-3': (children) => (
      children.map(child => <h3 className="post-header-level-3">{child}</h3>)
    ),
    'header-level-4': (children) => (
      children.map(child => <h4 className="post-header-level-4">{child}</h4>)
    ),
    'header-level-5': (children) => (
      children.map(child => <h5 className="post-header-level-5">{child}</h5>)
    ),
    'header-level-6': (children) => (
      children.map(child => <h6 className="post-header-level-6">{child}</h6>)
    ),
    blockquote: (children) => (
      <blockquote className="post-blockquote">
        {addBreaklines(children)}
      </blockquote>
    ),
    'code-block': (children) => (
      <pre className="post-code-block">{addBreaklines(children)}</pre>
    ),
    'unordered-list-item': (children, depth) => (
      <ul className={`ul-level-${depth}`}>
        {children.map(child => (
          <li className="post-unordered-list-item">
            {child}
          </li>
        ))}
      </ul>
    ),
    'ordered-list-item': (children, depth) => (
      <ol className={`ol-level-${depth}`}>
        {children.map(child => (
          <li className="post-ordered-list-item">
            {child}
          </li>
        ))}
      </ol>
    ),
    unstyled: (children) => (
      children.map(child => {
        return <p className="post-paragraph">{child}</p>;
      })
    ),
  },
  /**
   * Entities receive children and the entity data
   */
  entities: {
    [EntityTypes.LINK]: (children, data) => (
      <a href={data.url} target="_blank">{children}</a>
    ),
    [EntityTypes.IMAGE]: (children, data) => (
      <img src={data.url} className="img-thumbnail" />
    ),
  },
};
