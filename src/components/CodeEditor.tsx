import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css'; 
import { FileCode, Search, GitBranch, Settings, MoreHorizontal, X } from 'lucide-react';
import './CodeEditor.css';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="vscode-container">
      {/* Activity Bar (Leftmost thin strip) */}
      <div className="activity-bar">
        <div className="activity-top">
           <div className="activity-item active"><FileCode size={24} strokeWidth={1.5} /></div>
           <div className="activity-item"><Search size={24} strokeWidth={1.5} /></div>
           <div className="activity-item"><GitBranch size={24} strokeWidth={1.5} /></div>
        </div>
        <div className="activity-bottom">
           <div className="activity-item"><Settings size={24} strokeWidth={1.5} /></div>
        </div>
      </div>

      {/* Side Bar (Explorer) */}
      <div className="sidebar">
        <div className="sidebar-header">
           <span>EXPLORER</span>
           <MoreHorizontal size={16} />
        </div>
        <div className="sidebar-content">
           <div className="explorer-section open">
             <div className="section-header"><span>MISSION PROJECT</span></div>
             <div className="file-tree">
               <div className="file-item active">
                 <FileCode size={14} className="file-icon html" />
                 <span>index.html</span>
               </div>
               <div className="file-item">
                 <FileCode size={14} className="file-icon css" />
                 <span>style.css</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="editor-main">
        {/* Tab Bar */}
        <div className="tab-bar">
          <div className="tab active">
            <FileCode size={14} className="file-icon html" />
            <span>index.html</span>
            <X size={14} className="close-tab" />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="breadcrumbs">
           <span>mission_project</span>
           <span>&gt;</span>
           <span>index.html</span>
        </div>

        {/* Code Content */}
        <div className="editor-content">
          <Editor
            value={code}
            onValueChange={onChange}
            highlight={(code) => Prism.highlight(code, Prism.languages.markup, 'markup')}
            padding={20}
            style={{
              fontFamily: '"JetBrains Mono", Consolas, monospace',
              fontSize: 14,
              minHeight: '100%',
              backgroundColor: 'transparent',
            }}
            textareaClassName="code-textarea"
            className="prism-editor"
          />
        </div>

        {/* Status Bar */}
        <div className="status-bar">
           <div className="status-left">
             <div className="status-item"><GitBranch size={12} /> main*</div>
             <div className="status-item"><X size={12} /> 0</div>
             <div className="status-item">! 0</div>
           </div>
           <div className="status-right">
             <div className="status-item">Ln {code.split('\n').length}, Col 1</div>
             <div className="status-item">UTF-8</div>
             <div className="status-item">HTML</div>
             <div className="status-item">Prettier</div>
           </div>
        </div>
      </div>
    </div>
  );
};
