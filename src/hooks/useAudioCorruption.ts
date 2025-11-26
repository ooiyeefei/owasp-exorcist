/**
 * useAudioCorruption - WebAudio hook for corruption-based soundscape
 * High corruption = Low frequency sawtooth (dissonant)
 * Low corruption = High frequency sine wave (harmonic)
 */

import { useRef, useEffect, useCallback, useState } from 'react';

interface AudioCorruptionConfig {
  enabled: boolean;
  volume: number;
}

interface AudioCorruptionReturn {
  initAudio: () => void;
  isInitialized: boolean;
  playInteractionSound: (type: 'click' | 'hover') => void;
  setVolume: (volume: number) => void;
}

// Frequency calculation based on corruption level
function getFrequency(level: number): number {
  if (level > 50) {
    // High corruption: Low frequency (40-80 Hz) - dissonant, unsettling
    return 40 + (level - 50) * 0.8;
  } else {
    // Low corruption: Higher frequency (220-440 Hz) - harmonic, angelic
    return 220 + (50 - level) * 4.4;
  }
}

// Waveform selection based on corruption level
function getWaveform(level: number): OscillatorType {
  return level > 50 ? 'sawtooth' : 'sine';
}

export function useAudioCorruption(
  corruptionLevel: number,
  config: AudioCorruptionConfig = { enabled: true, volume: 0.3 }
): AudioCorruptionReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize audio context and nodes (must be called from user interaction)
  const initAudio = useCallback(() => {
    if (audioContextRef.current) {
      // Resume if suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsInitialized(true);
      return;
    }

    try {
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = config.volume;
      gainNode.connect(audioContext.destination);
      gainNodeRef.current = gainNode;

      // Create oscillator for background drone
      const oscillator = audioContext.createOscillator();
      oscillator.type = getWaveform(corruptionLevel);
      oscillator.frequency.value = getFrequency(corruptionLevel);
      oscillator.connect(gainNode);
      oscillator.start();
      oscillatorRef.current = oscillator;

      setIsInitialized(true);
      console.log('Audio initialized - The spirits are awakening...');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }, [corruptionLevel, config.volume]);

  // Update oscillator when corruption level changes
  useEffect(() => {
    if (!isInitialized || !oscillatorRef.current || !audioContextRef.current) return;

    const oscillator = oscillatorRef.current;
    const audioContext = audioContextRef.current;

    // Smoothly transition frequency
    oscillator.frequency.setTargetAtTime(
      getFrequency(corruptionLevel),
      audioContext.currentTime,
      0.5 // Time constant for smooth transition
    );

    // Change waveform (requires creating new oscillator for smooth transition)
    const newWaveform = getWaveform(corruptionLevel);
    if (oscillator.type !== newWaveform) {
      oscillator.type = newWaveform;
    }
  }, [corruptionLevel, isInitialized]);

  // Play interaction sound effects
  const playInteractionSound = useCallback((type: 'click' | 'hover') => {
    if (!isInitialized || !audioContextRef.current || corruptionLevel <= 50) return;
    if (!config.enabled) return;

    const audioContext = audioContextRef.current;

    try {
      // Create a short noise burst for interactions
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'square';
      oscillator.frequency.value = type === 'click' ? 150 : 200;

      gainNode.gain.value = 0.1;
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.error('Failed to play interaction sound:', error);
    }
  }, [isInitialized, corruptionLevel, config.enabled]);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = Math.max(0, Math.min(1, volume));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    initAudio,
    isInitialized,
    playInteractionSound,
    setVolume
  };
}

export default useAudioCorruption;
