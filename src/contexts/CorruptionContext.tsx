/**
 * CorruptionContext - Central state management for corruption level
 * Polls corruption-state.json and injects CSS variables
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface Vulnerability {
  type: string;
  file: string;
  pattern: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  count?: number;
  componentName?: string;
  owaspCategory?: string;
  hints?: string[];
  generatedAt?: string;
}

interface GeneratedComponent {
  filename: string;
  componentName: string;
  vulnerabilityType: string;
  owaspCategory: string;
  difficulty: number;
  hints: string[];
  generatedAt: string;
  templateId: string;
}

interface CorruptionState {
  corruptionLevel: number;
  vulnerabilities: Vulnerability[];
  timestamp: number;
  lastScan: string;
  sessionId?: string;
  difficulty?: 'easy' | 'hard';
  generatedComponents?: GeneratedComponent[];
  scanDuration?: number;
}

interface CorruptionContextValue {
  corruptionLevel: number;
  vulnerabilities: Vulnerability[];
  isLoading: boolean;
  lastUpdate: Date | null;
  connectionStatus: 'connected' | 'disconnected' | 'error';
  corruptionState: 'sanctified' | 'possessed' | 'damned' | CorruptionState;
  fullState?: CorruptionState;
}

const CorruptionContext = createContext<CorruptionContextValue | null>(null);

// CSS variable injection based on corruption level
function injectCSSVariables(level: number) {
  const root = document.documentElement;
  const intensity = level / 100;

  root.style.setProperty('--corruption-intensity', intensity.toString());
  root.style.setProperty('--corruption-blur', `${intensity * 10}px`);
  root.style.setProperty('--corruption-hue', `${intensity * 180}deg`);
  root.style.setProperty('--corruption-saturation', `${100 + intensity * 200}%`);
  root.style.setProperty('--corruption-brightness', `${100 - intensity * 50}%`);
  root.style.setProperty('--corruption-overlay-opacity', (intensity * 0.6).toString());
  root.style.setProperty('--corruption-glitch-amount', `${intensity * 20}px`);
  root.style.setProperty('--corruption-turbulence', (0.01 + intensity * 0.05).toString());
  root.style.setProperty('--corruption-displacement', (intensity * 30).toString());
}

function getCorruptionState(level: number): 'sanctified' | 'possessed' | 'damned' {
  if (level <= 20) return 'sanctified';
  if (level <= 70) return 'possessed';
  return 'damned';
}

interface CorruptionProviderProps {
  children: ReactNode;
  pollInterval?: number;
}

export function CorruptionProvider({ children, pollInterval = 5000 }: CorruptionProviderProps) {
  const [corruptionLevel, setCorruptionLevel] = useState(100);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [fullState, setFullState] = useState<CorruptionState | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');
  const [backoffDelay, setBackoffDelay] = useState(pollInterval);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Pause polling during user interaction to prevent scroll jumping
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let interactionTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsUserInteracting(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 2000); // Resume polling 2 seconds after scroll stops
    };
    
    const handleInteraction = () => {
      setIsUserInteracting(true);
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 1500);
    };
    
    // Listen for various user interactions
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    document.addEventListener('focusin', handleInteraction);
    document.addEventListener('input', handleInteraction);
    
    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(interactionTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      document.removeEventListener('focusin', handleInteraction);
      document.removeEventListener('input', handleInteraction);
    };
  }, []);

  const fetchCorruptionState = useCallback(async () => {
    // Skip polling if user is actively interacting
    if (isUserInteracting) {
      return;
    }
    try {
      // Add timestamp to prevent caching
      const timestamp = Date.now();
      const response = await fetch(`/corruption-state.json?t=${timestamp}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const state: CorruptionState = await response.json();
      
      // Only update if the state has actually changed (check timestamp)
      if (state.timestamp !== lastTimestamp) {
        setCorruptionLevel(state.corruptionLevel);
        setVulnerabilities(state.vulnerabilities);
        setFullState(state);
        setLastUpdate(new Date());
        setLastTimestamp(state.timestamp);
        injectCSSVariables(state.corruptionLevel);
      }
      
      setConnectionStatus('connected');
      setBackoffDelay(pollInterval); // Reset backoff on success
      setConsecutiveErrors(0); // Reset error count on success
      
    } catch (error) {
      console.warn('Failed to fetch corruption state:', error);
      const newErrorCount = consecutiveErrors + 1;
      setConsecutiveErrors(newErrorCount);
      
      // Only show error after 3 consecutive failures
      if (newErrorCount >= 3) {
        setConnectionStatus('error');
      }
      
      // Exponential backoff: 1s, 2s, 4s, max 8s
      setBackoffDelay(prev => Math.min(prev * 2, 8000));
    } finally {
      setIsLoading(false);
    }
  }, [pollInterval, isUserInteracting, lastTimestamp, consecutiveErrors]);

  useEffect(() => {
    // Initial fetch
    fetchCorruptionState();

    // Set up polling
    const intervalId = setInterval(fetchCorruptionState, backoffDelay);

    return () => clearInterval(intervalId);
  }, [fetchCorruptionState, backoffDelay]);



  // Update CSS variables when corruption level changes
  useEffect(() => {
    injectCSSVariables(corruptionLevel);
  }, [corruptionLevel]);

  const value: CorruptionContextValue = {
    corruptionLevel,
    vulnerabilities,
    isLoading,
    lastUpdate,
    connectionStatus,
    corruptionState: getCorruptionState(corruptionLevel),
    fullState
  };

  return (
    <CorruptionContext.Provider value={value}>
      {children}
    </CorruptionContext.Provider>
  );
}

export function useCorruption(): CorruptionContextValue {
  const context = useContext(CorruptionContext);
  if (!context) {
    throw new Error('useCorruption must be used within a CorruptionProvider');
  }
  return context;
}

export default CorruptionContext;
