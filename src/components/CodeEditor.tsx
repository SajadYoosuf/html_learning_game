import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import './CodeEditor.css';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="window-controls">
          <div className="control red"></div>
          <div className="control yellow"></div>
          <div className="control green"></div>
        </div>
        <span className="file-name">mission_control.html</span>
      </div>
      <div className="editor-body">
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={(code) => Prism.highlight(code, Prism.languages.markup, 'markup')}
          padding={24}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            minHeight: '100%',
          }}
          className="prism-editor"
        />
      </div>
    </div>
  );
};
