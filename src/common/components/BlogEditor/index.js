import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

class BlogEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
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


  _handleKeyCommand(command) {
    let { editorState } = this.state;
    let newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  }

  render() {
    let {
      editorState,
    } = this.state;

    return (
      <div className="blogEditor-root">
        <div className="blogEditor-container" onClick={this.focus}>
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

export default BlogEditor;
