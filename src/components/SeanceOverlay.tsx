/**
 * SeanceOverlay - Audio initialization gate
 * Forces user interaction to unlock AudioContext (browser policy compliance)
 */

import { useState } from 'react';
import './SeanceOverlay.css';

interface SeanceOverlayProps {
  onStart: () => void;
}

export function SeanceOverlay({ onStart }: SeanceOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // Small delay for exit animation
    setTimeout(() => {
      onStart();
    }, 500);
  };

  return (
    <div className={`seance-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="seance-content">
        <div className="pentagram">⛧</div>
        <h1 className="seance-title">THE DIGITAL EXORCISM</h1>
        <p className="seance-subtitle">Your code is haunted by OWASP demons</p>
        <p className="seance-description">
          Use Kiro to purify the corrupted components and restore sanctity to your codebase.
        </p>
        <button 
          className="seance-button"
          onClick={handleEnter}
        >
          ENTER THE NIGHTMARE
        </button>
        <p className="seance-warning">
          🔊 Audio will be enabled. Headphones recommended.
        </p>
      </div>
      <div className="seance-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />
        ))}
      </div>
    </div>
  );
}

export default SeanceOverlay;
