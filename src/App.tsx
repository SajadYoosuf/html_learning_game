import { useState, useEffect } from 'react';
import { Terminal, Play, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CodeEditor } from './components/CodeEditor';
import { levels } from './data/levels';
import './App.css';

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [code, setCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentLevel = levels[currentLevelIndex];

  useEffect(() => {
    // Reset code when level changes
    setCode(currentLevel.initialCode);
    setShowSuccess(false);
  }, [currentLevelIndex]);

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
        setStreak(prev => prev + 1);
        setShowSuccess(true);
      }
    } else {
      // Shake animation or error feedback could go here
      // For now, we'll just log or show a toast if we had one.
      // Maybe a simple alert or just relying on the user seeing the output not matching
      alert(`Mission Failed: ${result.error}`);
      setStreak(0);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      alert("All missions completed! You are now a HTML HTML Officer.");
    }
  };

  // Simple Markdown renderer helper
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
    <div className="app-container">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="top-bar"
      >
        <div className="brand">
          <Terminal size={24} className="brand-icon" />
          <span>Code<span style={{color: 'var(--primary)'}}>Naut</span></span>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">EXP</span>
            <span className="stat-value">{xp}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">STREAK</span>
            <span className="stat-value">{streak} 🔥</span>
          </div>
          <div className="stat-item" style={{ borderColor: 'var(--primary)' }}>
            <span className="stat-label">LEVEL</span>
            <span className="stat-value">{currentLevel.id}</span>
          </div>
        </div>
      </motion.header>

      <main className="main-grid">
        {/* Left: Instruction */}
        <motion.div 
          key={currentLevel.id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="instruction-panel"
        >
          <div className="instruction-card">
            <div className="mission-title">Mission: {currentLevel.missionName}</div>
            <h1 className="level-title">{currentLevel.title}</h1>
            <p className="description">{currentLevel.description}</p>
            
            {/* {currentLevel.exampleSnippet && (
              <div className="example-box">
                <span className="example-label">Example Code</span>
                <pre className="example-code">
                  <code>{currentLevel.exampleSnippet}</code>
                </pre>
              </div>
            )} */}
            
            <div className="goal-box">
              <span className="goal-label">Objective</span>
              <p className="goal-text markdown-instr">
                {renderMarkdown(currentLevel.instruction)}
              </p>
            </div>

            <div className="action-area">
              <button className="btn-primary" onClick={handleRun}>
                <Play size={20} />
                DEPLOY CODE
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Workspace */}
        <div className="workspace-panel">
          {/* Code Editor */}
          <div style={{ flex: 1.5, minHeight: 0 }}>
             <CodeEditor code={code} onChange={setCode} />
          </div>

          {/* Preview */}
          <div className="preview-container">
             <div className="preview-label">Live Feed</div>
             <iframe 
               title="preview"
               srcDoc={code} // React handles this safely usually, but for a learning app this is standard
               style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
               sandbox="allow-scripts"
             />
          </div>
        </div>
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
              <p className="success-sub">Signal established strongly. Ready for next transmission?</p>
              
              <button className="btn-primary" onClick={handleNextLevel}>
                Next Level <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
