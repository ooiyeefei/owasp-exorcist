/**
 * App - Main application component for The Digital Exorcism
 * Wires together all components with corruption-based styling
 */

import { useState } from 'react';
import { CorruptionProvider, useCorruption } from './contexts/CorruptionContext';
import { SeanceOverlay } from './components/SeanceOverlay';
import { DashboardDynamic as Dashboard } from './components/DashboardDynamic';
import { CorruptionFilter } from './components/VisualEffects/CorruptionFilter';
import { ParticleBackground } from './components/VisualEffects/ParticleBackground';
import { AudioControls } from './components/AudioControls';
import { GitHubLink } from './components/GitHubLink';
import { useAudioCorruption } from './hooks/useAudioCorruption';
import './styles/corruption.css';
import './App.css';

function AppContent() {
  const [hasStarted, setHasStarted] = useState(false);
  const { corruptionLevel, corruptionState } = useCorruption();
  const { 
    initAudio, 
    isMuted, 
    currentDamnedTrack, 
    currentSanctifiedTrack,
    setMuted,
    switchDamnedTrack,
    switchSanctifiedTrack
  } = useAudioCorruption(corruptionLevel, { enabled: true, volume: 0.2 });

  const handleStart = () => {
    initAudio();
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <>
        <GitHubLink />
        <SeanceOverlay onStart={handleStart} />
      </>
    );
  }

  // Determine particle color based on corruption state
  const getParticleColor = () => {
    if (corruptionState === 'sanctified') return 'rgba(102, 126, 234, 0.8)'; // Blue/purple for sanctified
    if (corruptionState === 'possessed') return 'rgba(168, 85, 247, 0.8)'; // Purple for possessed
    return '#8b0000'; // Dark red for damned
  };

  return (
    <div className={`app-container ${corruptionState}`} data-corruption={corruptionState}>
      <ParticleBackground particleCount={28} color={getParticleColor()} />
      <CorruptionFilter corruptionLevel={corruptionLevel} />
      <GitHubLink />
      <AudioControls
        isMuted={isMuted}
        currentDamnedTrack={currentDamnedTrack}
        currentSanctifiedTrack={currentSanctifiedTrack}
        corruptionLevel={corruptionLevel}
        onMuteToggle={() => setMuted(!isMuted)}
        onDamnedTrackChange={switchDamnedTrack}
        onSanctifiedTrackChange={switchSanctifiedTrack}
      />
      <Dashboard />
    </div>
  );
}

function App() {
  return (
    <CorruptionProvider>
      <AppContent />
    </CorruptionProvider>
  );
}

export default App;
