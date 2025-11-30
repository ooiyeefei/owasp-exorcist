/**
 * App - Main application component for The Digital Exorcism
 * Wires together all components with corruption-based styling
 */

import { useState } from 'react';
import { CorruptionProvider, useCorruption } from './contexts/CorruptionContext';
import { SeanceOverlay } from './components/SeanceOverlay';
import { DashboardDynamic as Dashboard } from './components/DashboardDynamic';
import { CorruptionFilter } from './components/VisualEffects/CorruptionFilter';
import { CorruptionOverlay } from './components/VisualEffects/CorruptionOverlay';
import { AudioControls } from './components/AudioControls';
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
    return <SeanceOverlay onStart={handleStart} />;
  }

  return (
    <div className={`app-container ${corruptionState}`} data-corruption={corruptionState}>
      <CorruptionFilter corruptionLevel={corruptionLevel} />
      <CorruptionOverlay />
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
