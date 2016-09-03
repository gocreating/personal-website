// A helpful component structure
// ref: <https://github.com/facebook/draft-js/pull/387>
//
// +----------+wrapper +->set by blockRenderMap
// |
// |    +-----+element w/ props +-->set by blockRenderMap
// |    |
// |    |   +-+component w/ props +-->set by blockRendererFn
// |    |   |
// |    |   |
// |    |   +-+
// |    |
// |    +-----+
// |
// |    // ... more blocks within the wrapper
// |
// +----------+

import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import { Map } from 'immutable';
import blockTypes from './blockTypes';

class BlogEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      blockRenderMap: DefaultDraftBlockRenderMap.merge(
        this._getBlockRenderMap()
      ),
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  // exposed method
  logState() {
    let { editorState } = this.state;
    let contentState = editorState.getCurrentContent();
    let rawDraftContentState = convertToRaw(contentState);

    console.log('==========================');
    console.log('rawDraftContentState', rawDraftContentState);
    console.log('==========================');
  }

  // exposed method
  setRawContent(rawContent) {
    let contentState = convertFromRaw(rawContent);
    let editorState = EditorState.createWithContent(contentState);
    this.setState({ editorState });
  }

  // exposed method
  getRawContent() {
    let contentState = this.state.editorState.getCurrentContent();
    return convertToRaw(contentState);
  }

  _getBlockRenderMap() {
    let obj = {
      'paragraph': {
        element: 'div',
      },
      'unstyled': {
        element: 'div',
      },
    };
    for (let blockType in blockTypes) {
      obj[blockType] = {
        element: 'div',
      };
    }
    return Map(obj);
  }

  _handleKeyCommand(command) {
    let { editorState } = this.state;
    let newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  blockRendererFn(contentBlock) {
    let type = contentBlock.getType();
    return blockTypes[type];
  }

  render() {
    let {
      editorState,
      blockRenderMap,
    } = this.state;

    return (
      <div className="blogEditor-root">
        <div className="blogEditor-container" onClick={this.focus}>
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            blockRenderMap={blockRenderMap}
            blockRendererFn={this.blockRendererFn}
          />
        </div>
      </div>
    );
  }
}

export default BlogEditor;
