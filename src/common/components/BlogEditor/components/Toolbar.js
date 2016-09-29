import React, { Component, PropTypes } from 'react';
import {
  RichUtils,
  Entity,
  Modifier,
  EditorState,
} from 'draft-js';
import { EntityTypes } from '../constants';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import EntityControls from './EntityControls';
import getEntityAtCursor from '../utils/getEntityAtCursor';
import clearEntityForRange from '../utils/clearEntityForRange';

class Toolbar extends Component {
  constructor() {
    super();
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.setLink = this._setLink.bind(this);
    this.insertImage = this._insertImage.bind(this);
  }

  componentDidMount() {
    /* eslint-disable */
    setTimeout(function() {
      let $toolbar = $('.blogEditor-toolbar');
      let $container = $('.blogEditor-container');
      let $window = $(window);
      /* eslint-enable */
      let resetDimension = () => {
        $toolbar.width($container.outerWidth());
        /* eslint-disable */
        let $affixedContainer =
        $('.blogEditor-toolbar.affix + .blogEditor-container');
        /* eslint-enable */
        $container.css('margin-top',
        $affixedContainer.length > 0 ? $toolbar.outerHeight() : 0);
      };
      $toolbar
        .affix({ offset: $toolbar.offset().top })
        .on('affixed-top.bs.affix', resetDimension)
        .on('affixed.bs.affix', resetDimension);
      $window.resize(resetDimension);
    }, 1000);
  }

  _toggleBlockType(blockType) {
    let { changeEditorState, editorState } = this.props;
    changeEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    let { changeEditorState, editorState } = this.props;
    changeEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  _setLink(url) {
    let { changeEditorState, focusEditor, editorState } = this.props;
    let selection = editorState.getSelection();
    let entityKey = Entity.create(EntityTypes.LINK, 'MUTABLE', { url });
    changeEditorState(RichUtils.toggleLink(
      editorState,
      selection,
      entityKey
    ), () => setTimeout(() => focusEditor(), 0));
  }

  _insertImage() {
    let { changeEditorState, editorState } = this.props;
    let currentContent = editorState.getCurrentContent();
    let selection = editorState.getSelection();
    let entityKey = Entity.create(EntityTypes.IMAGE, 'IMMUTABLE', {
      url: '/img/favicon.ico',
    });
    let withEntity = Modifier.insertText(
      currentContent,
      selection,
      ' ',
      null,
      entityKey
    );
    changeEditorState(EditorState.push(
      editorState,
      withEntity,
      'insert-text'
    ));
  }

  render() {
    let { editorState } = this.props;

    return (
      <div className="blogEditor-toolbar">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <EntityControls
          editorState={editorState}
          onLinkBtnClick={() => {
            this.setLink('');
          }}
          onRemoveLinkBtnClick={() => {
            let { changeEditorState, editorState } = this.props;
            let entity = getEntityAtCursor(editorState);
            if (entity != null) {
              let { blockKey, startOffset, endOffset } = entity;
              changeEditorState(clearEntityForRange(
                editorState, blockKey, startOffset, endOffset
              ));
            }
          }}
          onImageBtnClick={() => {
            this.insertImage();
          }}
        />
      </div>
    );
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  changeEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
};

export default Toolbar;
