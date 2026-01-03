import React, { useState } from 'react';
import { Play, BookOpen, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Level } from '../data/levels';
import { ConceptVisual } from './ConceptVisual';
import './InstructionPanel.css';

interface InstructionPanelProps {
  level: Level;
  onRun: () => void;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({ level, onRun }) => {
  const [activeTab, setActiveTab] = useState<'briefing' | 'mission'>('briefing');

  // Markdown renderer helper
  const renderMarkdown = (text: string) => {
    const parts = text.split(/(`[^`]+`)/);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="instruction-card">
      <div className="card-header">
        <div className="mission-meta">
          <span className="mission-id">Mission {level.id.toString().padStart(2, '0')}</span>
          <h2 className="mission-name">{level.missionName}</h2>
        </div>
        
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'briefing' ? 'active' : ''}`}
            onClick={() => setActiveTab('briefing')}
          >
            <BookOpen size={14} /> Briefing
          </button>
          <button 
            className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
            onClick={() => setActiveTab('mission')}
          >
            <Target size={14} /> Mission
          </button>
        </div>
      </div>

      <div className="card-body">
        <AnimatePresence mode="wait">
          {activeTab === 'briefing' ? (
            <motion.div 
              key="briefing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="tab-content briefing"
            >
              <h3 className="section-title">Concept: {level.title}</h3>
              <p className="description">{level.simpleExplanation}</p>
              
              {level.visualType && (
                <ConceptVisual type={level.visualType} />
              )}

              {level.analogy && (
                <div className="analogy-box">
                  <span className="analogy-label">Analogy</span>
                  <p>"{level.analogy}"</p>
                </div>
              )}

              <button className="btn-secondary" onClick={() => setActiveTab('mission')}>
                Go to Mission &rarr;
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="mission"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="tab-content mission"
            >
              <h3 className="section-title">Objectives</h3>
              <p className="description">{level.description}</p>
              
              <div className="goal-box">
                <span className="goal-label">Task</span>
                <p className="goal-text markdown-instr">
                  {renderMarkdown(level.instruction)}
                </p>
              </div>

               {level.exampleSnippet && (
                <div className="example-box">
                  <span className="example-label">Reference</span>
                  <pre className="example-code">
                    <code>{level.exampleSnippet}</code>
                  </pre>
                </div>
              )}

              <div className="action-area">
                <button className="btn-primary" onClick={onRun}>
                  <Play size={20} />
                  DEPLOY CODE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
