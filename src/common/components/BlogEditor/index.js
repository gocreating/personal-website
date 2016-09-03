import React, { Component } from 'react';
import {
  Editor,
  EditorState,
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
          />
        </div>
      </div>
    );
  }
}

export default BlogEditor;
