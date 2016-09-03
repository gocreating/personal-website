import React, { Component } from 'react';
import {
  Editor,
  EditorState,
} from 'draft-js';

class BlogEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
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
