import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, Info, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const OutputBox = ({ output, loading, mode, onSpeech }) => {
  const [activeChunk, setActiveChunk] = useState(0);

  if (loading) {
    return (
      <div className="output-box-empty">
        <div className="loading-spinner"></div>
        <p>Adapting for {mode}...</p>
      </div>
    );
  }

  if (!output || output.length === 0) {
    return (
      <div className="output-box-empty">
        <Sparkles size={40} className="empty-icon" />
        <p>Transformed content will appear here.</p>
        <div className="empty-hint">Click "Transform" to start.</div>
      </div>
    );
  }

  // ADHD Mode: One Card at a time (optional specialized display)
  const isADHD = mode === 'ADHD Mode';

  return (
    <div className={`output-box-container ${mode.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="output-box-header">
        <div className="mode-badge">
          <CheckCircle2 size={14} />
          <span>{mode}</span>
        </div>
        <button className="speech-btn" onClick={() => onSpeech(output.join('. '))}>
          <Volume2 size={16} />
          <span>Read Aloud</span>
        </button>
      </div>

      <div className="output-scroll-container">
        <AnimatePresence mode="wait">
          {output.map((chunk, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: index * 0.1 }}
               className="output-item-card"
             >
               {chunk}
             </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="output-box-footer">
        <Info size={14} />
        <span>Output optimized for {mode} readability.</span>
      </div>
    </div>
  );
};

export default OutputBox;
