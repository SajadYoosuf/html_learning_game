import React from 'react';
import type { VisualType } from '../data/levels';
import { Image as ImageIcon, Link as LinkIcon, MousePointer } from 'lucide-react';
import './ConceptVisual.css';

interface ConceptVisualProps {
  type: VisualType;
}

export const ConceptVisual: React.FC<ConceptVisualProps> = ({ type }) => {
  if (!type || type === 'none') return null;

  const renderVisual = () => {
    switch (type) {
      case 'structure-h1':
        return (
          <div className="visual-block structure-h1">
            <div className="fake-browser">
              <div className="browser-bar">
                <div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div>
              </div>
              <div className="content">
                <div className="h1-block">Heading 1</div>
                <div className="p-block">Normal Text</div>
                <div className="p-block">Normal Text</div>
              </div>
            </div>
            <div className="annotation">
              Biggest Text = Most Important
            </div>
          </div>
        );
      case 'structure-p':
        return (
          <div className="visual-block structure-p">
             <div className="fake-browser">
              <div className="content">
                <div className="h1-block sm">Title</div>
                <div className="p-block highlight">Paragraph: A block of text goes here. It wraps to the next line.</div>
                <div className="p-block highlight">Paragraph: Another block of text starts on a new line.</div>
              </div>
            </div>
          </div>
        );
      case 'interactive-button':
        return (
          <div className="visual-block interactive-button">
            <div className="btn-demo">
              <MousePointer className="cursor-icon" />
              <button>Click Me</button>
            </div>
          </div>
        );
      case 'media-img':
        return (
          <div className="visual-block media-img">
            <div className="img-placeholder">
              <ImageIcon size={48} />
              <span>Image Source (src)</span>
            </div>
          </div>
        );
      case 'link-a':
        return (
          <div className="visual-block link-a">
            <div className="link-demo">
              <div className="world-a">You Are Here</div>
              <LinkIcon className="link-connector" />
              <div className="world-b">Google.com</div>
            </div>
          </div>
        );
      case 'list-ul':
        return (
          <div className="visual-block list-ul">
            <div className="list-demo">
              <div className="list-item"><span>•</span> Item 1</div>
              <div className="list-item"><span>•</span> Item 2</div>
              <div className="list-item"><span>•</span> Item 3</div>
            </div>
          </div>
        );
      case 'list-ol':
        return (
          <div className="visual-block list-ol">
             <div className="list-demo">
              <div className="list-item"><span>1.</span> First</div>
              <div className="list-item"><span>2.</span> Second</div>
              <div className="list-item"><span>3.</span> Third</div>
            </div>
          </div>
        );
      case 'input-text':
        return (
           <div className="visual-block input-text">
             <div className="input-demo">
               <span>User types here:</span>
               <div className="fake-input">Hello World|</div>
             </div>
           </div>
        );
       case 'group-div':
        return (
           <div className="visual-block group-div">
             <div className="div-box">
               <span className="div-label">&lt;div&gt; Container</span>
               <div className="child-element">Child 1</div>
               <div className="child-element">Child 2</div>
             </div>
           </div>
        );
        case 'style-color':
          return (
             <div className="visual-block style-color">
               <div className="palette">
                 <div className="swatch red" style={{background: 'red'}}></div>
                 <div className="swatch blue" style={{background: 'blue'}}></div>
                 <div className="swatch green" style={{background: 'green'}}></div>
               </div>
               <div className="text-demo" style={{color: 'red'}}>Red Text</div>
             </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="concept-visual-container">
      {renderVisual()}
    </div>
  );
};
