/**
 * useAudioCorruption - Howler.js-based audio system for corruption soundscape
 * High corruption = Spooky Halloween music
 * Low corruption = Peaceful, angelic music
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { Howl } from 'howler';

interface AudioCorruptionConfig {
  enabled: boolean;
  volume: number;
}

interface AudioCorruptionReturn {
  initAudio: () => void;
  isInitialized: boolean;
  isMuted: boolean;
  currentDamnedTrack: number;
  currentSanctifiedTrack: number;
  playInteractionSound: (type: 'click' | 'hover') => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  switchDamnedTrack: (index: number) => void;
  switchSanctifiedTrack: (index: number) => void;
}

// Multiple Halloween soundtrack options
const DAMNED_TRACKS = [
  { name: 'Horror Ambience', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Dark Tension', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: 'Creepy Atmosphere', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
];

const SANCTIFIED_TRACKS = [
  { name: 'Peaceful Garden', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Ethereal Dreams', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { name: 'Angelic Choir', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
];

export { DAMNED_TRACKS, SANCTIFIED_TRACKS };

export function useAudioCorruption(
  corruptionLevel: number,
  config: AudioCorruptionConfig = { enabled: true, volume: 0.2 }
): AudioCorruptionReturn {
  const damnedSoundRef = useRef<Howl | null>(null);
  const sanctifiedSoundRef = useRef<Howl | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentDamnedTrack, setCurrentDamnedTrack] = useState(0);
  const [currentSanctifiedTrack, setCurrentSanctifiedTrack] = useState(0);
  const currentTrackRef = useRef<'damned' | 'sanctified' | null>(null);

  // Initialize audio with Howler.js (must be called from user interaction)
  const initAudio = useCallback(() => {
    if (isInitialized) {
      // Resume if already initialized
      if (damnedSoundRef.current) damnedSoundRef.current.play();
      if (sanctifiedSoundRef.current) sanctifiedSoundRef.current.play();
      return;
    }

    try {
      console.log('🎵 Initializing Howler.js audio system...');

      // Create Howl instances for both tracks (using first track from each array)
      const damnedSound = new Howl({
        src: [DAMNED_TRACKS[currentDamnedTrack].url],
        loop: true,
        volume: config.volume,
        html5: true, // Use HTML5 Audio for streaming
        onload: () => console.log('✅ Damned track loaded successfully'),
        onloaderror: (_id, error) => console.error('❌ Failed to load damned track:', error),
        onplayerror: (_id, error) => console.error('❌ Failed to play damned track:', error)
      });
      damnedSoundRef.current = damnedSound;

      const sanctifiedSound = new Howl({
        src: [SANCTIFIED_TRACKS[currentSanctifiedTrack].url],
        loop: true,
        volume: 0, // Start muted
        html5: true,
        onload: () => console.log('✅ Sanctified track loaded successfully'),
        onloaderror: (_id, error) => console.error('❌ Failed to load sanctified track:', error),
        onplayerror: (_id, error) => console.error('❌ Failed to play sanctified track:', error)
      });
      sanctifiedSoundRef.current = sanctifiedSound;

      // Start with damned track if corruption is high
      if (corruptionLevel > 50) {
        console.log('🎵 Starting damned track (corruption:', corruptionLevel + '%)');
        damnedSound.play();
        currentTrackRef.current = 'damned';
      } else {
        console.log('🎵 Starting sanctified track (corruption:', corruptionLevel + '%)');
        sanctifiedSound.volume(config.volume);
        sanctifiedSound.play();
        currentTrackRef.current = 'sanctified';
      }

      setIsInitialized(true);
      console.log('🎵 Howler.js audio system initialized - The spirits are awakening...');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }, [corruptionLevel, config.volume, isInitialized]);

  // Crossfade between tracks when corruption level changes
  useEffect(() => {
    if (!isInitialized || !damnedSoundRef.current || !sanctifiedSoundRef.current) return;

    const damnedSound = damnedSoundRef.current;
    const sanctifiedSound = sanctifiedSoundRef.current;

    // Determine which track should be playing
    const shouldPlayDamned = corruptionLevel > 50;
    const targetTrack = shouldPlayDamned ? 'damned' : 'sanctified';

    // Only crossfade if track needs to change
    if (currentTrackRef.current !== targetTrack) {
      console.log(`🎵 Crossfading to ${targetTrack} track (corruption: ${corruptionLevel}%)`);
      
      // Use Howler's built-in fade method for smooth transitions
      if (shouldPlayDamned) {
        // Fade in damned, fade out sanctified
        damnedSound.fade(0, config.volume, 2000); // 2 second fade
        sanctifiedSound.fade(config.volume, 0, 2000);
        
        // Ensure damned is playing
        if (!damnedSound.playing()) {
          damnedSound.play();
        }
      } else {
        // Fade in sanctified, fade out damned
        sanctifiedSound.fade(0, config.volume, 2000);
        damnedSound.fade(config.volume, 0, 2000);
        
        // Ensure sanctified is playing
        if (!sanctifiedSound.playing()) {
          sanctifiedSound.play();
        }
      }

      currentTrackRef.current = targetTrack;
    }
  }, [corruptionLevel, isInitialized, config.volume]);

  // Play interaction sound effects (simple beep for now)
  const playInteractionSound = useCallback((_type: 'click' | 'hover') => {
    // Interaction sounds disabled for now - can add later if needed
    return;
  }, []);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (damnedSoundRef.current) {
      damnedSoundRef.current.volume(clampedVolume);
    }
    if (sanctifiedSoundRef.current) {
      sanctifiedSoundRef.current.volume(clampedVolume);
    }
  }, []);

  // Mute/unmute
  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    if (damnedSoundRef.current) {
      damnedSoundRef.current.volume(muted ? 0 : config.volume);
    }
    if (sanctifiedSoundRef.current) {
      sanctifiedSoundRef.current.volume(muted ? 0 : config.volume);
    }
  }, [config.volume]);

  // Switch damned track
  const switchDamnedTrack = useCallback((index: number) => {
    if (!isInitialized || index < 0 || index >= DAMNED_TRACKS.length) return;
    
    console.log(`🎵 Switching to damned track ${index}: ${DAMNED_TRACKS[index].name}`);
    
    // Unload old track
    if (damnedSoundRef.current) {
      damnedSoundRef.current.unload();
    }
    
    // Create new track
    const newSound = new Howl({
      src: [DAMNED_TRACKS[index].url],
      loop: true,
      volume: isMuted ? 0 : (currentTrackRef.current === 'damned' ? config.volume : 0),
      html5: true,
      onload: () => console.log(`✅ Loaded: ${DAMNED_TRACKS[index].name}`)
    });
    
    damnedSoundRef.current = newSound;
    setCurrentDamnedTrack(index);
    
    // Play if it should be playing
    if (currentTrackRef.current === 'damned') {
      newSound.play();
    }
  }, [isInitialized, isMuted, config.volume]);

  // Switch sanctified track
  const switchSanctifiedTrack = useCallback((index: number) => {
    if (!isInitialized || index < 0 || index >= SANCTIFIED_TRACKS.length) return;
    
    console.log(`🎵 Switching to sanctified track ${index}: ${SANCTIFIED_TRACKS[index].name}`);
    
    // Unload old track
    if (sanctifiedSoundRef.current) {
      sanctifiedSoundRef.current.unload();
    }
    
    // Create new track
    const newSound = new Howl({
      src: [SANCTIFIED_TRACKS[index].url],
      loop: true,
      volume: isMuted ? 0 : (currentTrackRef.current === 'sanctified' ? config.volume : 0),
      html5: true,
      onload: () => console.log(`✅ Loaded: ${SANCTIFIED_TRACKS[index].name}`)
    });
    
    sanctifiedSoundRef.current = newSound;
    setCurrentSanctifiedTrack(index);
    
    // Play if it should be playing
    if (currentTrackRef.current === 'sanctified') {
      newSound.play();
    }
  }, [isInitialized, isMuted, config.volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (damnedSoundRef.current) {
        damnedSoundRef.current.unload();
        damnedSoundRef.current = null;
      }
      if (sanctifiedSoundRef.current) {
        sanctifiedSoundRef.current.unload();
        sanctifiedSoundRef.current = null;
      }
    };
  }, []);

  return {
    initAudio,
    isInitialized,
    isMuted,
    currentDamnedTrack,
    currentSanctifiedTrack,
    playInteractionSound,
    setVolume,
    setMuted,
    switchDamnedTrack,
    switchSanctifiedTrack
  };
}

export default useAudioCorruption;
