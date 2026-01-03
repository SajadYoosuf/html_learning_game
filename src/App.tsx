import { useState, useEffect } from 'react';
import { Terminal, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CodeEditor } from './components/CodeEditor';
import { InstructionPanel } from './components/InstructionPanel';
import { Roadmap } from './components/Roadmap';
import { levels } from './data/levels';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'roadmap' | 'editor'>('roadmap');
  
  // Persist Unlock Level
  const [unlockedLevelId, setUnlockedLevelId] = useState(() => {
    const saved = localStorage.getItem('codenaut-level');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [currentLevelId, setCurrentLevelId] = useState(unlockedLevelId);

  const [code, setCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Persist XP
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('codenaut-xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save state effects
  useEffect(() => {
    localStorage.setItem('codenaut-level', unlockedLevelId.toString());
  }, [unlockedLevelId]);

  useEffect(() => {
    localStorage.setItem('codenaut-xp', xp.toString());
  }, [xp]);

  // Derived state
  const currentLevelIndex = levels.findIndex(l => l.id === currentLevelId);
  const currentLevel = levels[currentLevelIndex] || levels[0];

  useEffect(() => {
    // Reset code when level changes
    if (currentLevel) {
      setCode(currentLevel.initialCode);
      setShowSuccess(false);
    }
  }, [currentLevelId]);

  const handleSelectLevel = (id: number) => {
    setCurrentLevelId(id);
    setViewMode('editor');
  };

  const handleReturnToMap = () => {
    setViewMode('roadmap');
  };

  const handleRun = () => {
    const result = currentLevel.validation(code);
    if (result.passed) {
      if (!showSuccess) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7000ff', '#00f0ff', '#ff0055']
        });
        setXp(prev => prev + 100);
        setShowSuccess(true);
        
        // Unlock next Level
        if (currentLevelId >= unlockedLevelId && currentLevelId < levels.length) {
            setUnlockedLevelId(currentLevelId + 1);
        }
      }
    } else {
      alert(`Mission Failed: ${result.error}`);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      const nextId = levels[currentLevelIndex + 1].id;
      setCurrentLevelId(nextId);
      // Reset success state handled by useEffect
    } else {
      alert("All missions completed! You are now a HTML HTML Officer.");
      setViewMode('roadmap');
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="top-bar"
      >
        <div className="brand" onClick={() => setViewMode('roadmap')} style={{cursor: 'pointer'}}>
          <Terminal size={24} className="brand-icon" />
          <span>Code<span style={{color: 'var(--primary)'}}>Naut</span></span>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">EXP</span>
            <span className="stat-value">{xp}</span>
          </div>
          <div className="stat-item" style={{ borderColor: 'var(--primary)' }}>
            <span className="stat-label">LEVEL</span>
            <span className="stat-value">{unlockedLevelId}</span>
          </div>
        </div>
      </motion.header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {viewMode === 'roadmap' ? (
             <motion.div 
               key="roadmap"
               className="view-wrapper"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
             >
               <Roadmap 
                 currentLevelId={currentLevelId} 
                 unlockedLevelId={unlockedLevelId}
                 onSelectLevel={handleSelectLevel} 
               />
             </motion.div>
          ) : (
            <motion.div 
              key="editor"
              className="view-wrapper editor-grid"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              {/* Back button overlay or integrated */}
              <button className="back-btn" onClick={handleReturnToMap}>
                <ChevronLeft size={20} /> MAP
              </button>

              <div className="left-panel">
                <InstructionPanel level={currentLevel} onRun={handleRun} />
              </div>

              <div className="right-panel">
                 <div className="code-section">
                    <CodeEditor code={code} onChange={setCode} />
                 </div>
                 <div className="preview-section">
                    <div className="preview-header">
                       <span className="preview-title">Live Preview</span>
                       <div className="preview-dots">
                          <div className="dot red"></div>
                          <div className="dot yellow"></div>
                          <div className="dot green"></div>
                       </div>
                    </div>
                    <iframe 
                        title="preview"
                        srcDoc={code}
                        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
                        sandbox="allow-scripts"
                    />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="success-modal"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="success-icon">
                <Check size={40} strokeWidth={4} />
              </div>
              <h2 className="success-title">Mission Accomplished!</h2>
              <p className="success-sub">Good work Cadet. Concept Secured.</p>
              
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => { setShowSuccess(false); setViewMode('roadmap'); }}>
                   Return to Map
                </button>
                <button className="btn-primary" onClick={handleNextLevel}>
                   Next Mission
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
