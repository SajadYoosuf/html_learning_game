import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import { levels } from '../data/levels';
import './Roadmap.css';

interface RoadmapProps {
  currentLevelId: number;
  onSelectLevel: (id: number) => void;
  unlockedLevelId: number; // Highest unlocked level
}

export const Roadmap: React.FC<RoadmapProps> = ({ currentLevelId, onSelectLevel, unlockedLevelId }) => {
  return (
    <div className="roadmap-container">
      <div className="galaxy-bg"></div>
      <h1 className="roadmap-title">Mission Map</h1>
      
      <div className="roadmap-path">
        {levels.map((level, index) => {
          const isUnlocked = level.id <= unlockedLevelId;
          const isCompleted = level.id < unlockedLevelId;
          const isCurrent = level.id === currentLevelId;

          // Calculate zig-zag position
          const xOffset = Math.sin(index * 0.8) * 100;

          return (
            <div key={level.id} className="level-node-wrapper" style={{ transform: `translateX(${xOffset}px)` }}>
              {index < levels.length - 1 && (
                <div className={`connector-line ${isUnlocked ? 'active' : ''}`}></div>
              )}
              
              <motion.button 
                className={`level-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {isCompleted ? (
                   <Check size={20} className="icon-check" />
                ) : isUnlocked ? (
                   <span className="level-num">{level.id}</span>
                ) : (
                   <Lock size={16} className="icon-lock" />
                )}
                
                {isCurrent && (
                   <div className="pulse-ring"></div>
                )}
              </motion.button>
              
              <div className={`level-info ${xOffset > 0 ? 'left' : 'right'}`}>
                 <span className="level-title">{level.title}</span>
                 <span className="level-name">{level.missionName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
