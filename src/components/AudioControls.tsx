/**
 * AudioControls - UI for controlling background music
 */

import { useState } from 'react';
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
  const isPlayingDamned = corruptionLevel > 50;

  return (
    <div className="audio-controls-container">
      <div className="audio-header">
        <button 
          className="collapse-button"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
        <button 
          className="mute-button"
          onClick={onMuteToggle}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
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
