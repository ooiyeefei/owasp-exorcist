/**
 * AudioControls - UI for controlling background music
 */

import { useState, useRef, useEffect } from 'react';
import { DAMNED_TRACKS, SANCTIFIED_TRACKS } from '../hooks/useAudioCorruption';
import './AudioControls.css';

interface AudioControlsProps {
  isMuted: boolean;
  currentDamnedTrack: number;
  currentSanctifiedTrack: number;
  corruptionLevel: number;
  onMuteToggle: () => void;
  onDamnedTrackChange: (index: number) => void;
  onSanctifiedTrackChange: (index: number) => void;
}

export function AudioControls({
  isMuted,
  currentDamnedTrack,
  currentSanctifiedTrack,
  corruptionLevel,
  onMuteToggle,
  onDamnedTrackChange,
  onSanctifiedTrackChange
}: AudioControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 }); // 1.5rem = 24px
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isPlayingDamned = corruptionLevel > 50;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - 300, prev.x + deltaX)),
        y: Math.max(0, Math.min(window.innerHeight - 100, prev.y + deltaY))
      }));
      
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'SELECT' || 
        (e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div 
      ref={dragRef}
      className={`audio-controls-container ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="audio-header">
        <button 
          className="collapse-button"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
        {isExpanded && (
          <button 
            className="mute-button"
            onClick={onMuteToggle}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="track-selector">
        <div className="track-group">
          <label className={`track-label ${isPlayingDamned ? 'active' : ''}`}>
            👻 Spooky Track {isPlayingDamned && '(Playing)'}
          </label>
          <select 
            value={currentDamnedTrack}
            onChange={(e) => onDamnedTrackChange(Number(e.target.value))}
            className={`track-select ${isPlayingDamned ? 'playing' : ''}`}
          >
            {DAMNED_TRACKS.map((track, index) => (
              <option key={index} value={index}>
                {track.name}
              </option>
            ))}
          </select>
        </div>

        <div className="track-group">
          <label className={`track-label ${!isPlayingDamned ? 'active' : ''}`}>
            😇 Peaceful Track {!isPlayingDamned && '(Playing)'}
          </label>
          <div className="select-wrapper">
            <select 
              value={currentSanctifiedTrack}
              onChange={(e) => onSanctifiedTrackChange(Number(e.target.value))}
              className={`track-select ${!isPlayingDamned ? 'playing' : 'locked'}`}
              title={isPlayingDamned ? 'Fix vulnerabilities to unlock (corruption ≤ 50%)' : 'Currently playing'}
              disabled={isPlayingDamned}
            >
              {SANCTIFIED_TRACKS.map((track, index) => (
                <option key={index} value={index}>
                  {track.name}
                </option>
              ))}
            </select>
            {isPlayingDamned && (
              <span className="helper-text">🔒 Fix bugs to unlock</span>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default AudioControls;
