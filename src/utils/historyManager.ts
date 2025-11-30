/**
 * Player History Manager
 * Tracks player's game sessions and vulnerability encounters
 * Requirements: 5.1, 5.2, 5.3, 5.4
 */

import type { PlayerHistory, SessionRecord } from '../types/vulnerability';

const HISTORY_KEY = 'digital-exorcism-history';

/**
 * Get player history from localStorage
 */
export function getHistory(): PlayerHistory {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) {
      return createEmptyHistory();
    }

    const history = JSON.parse(stored) as PlayerHistory;
    
    // Validate structure
    if (!history.sessions || !Array.isArray(history.sessions)) {
      console.warn('Invalid history structure, resetting');
      return createEmptyHistory();
    }

    return history;
  } catch (error) {
    console.error('Failed to load history:', error);
    return createEmptyHistory();
  }
}

/**
 * Save player history to localStorage
 */
export function saveHistory(history: PlayerHistory): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

/**
 * Create empty history structure
 */
function createEmptyHistory(): PlayerHistory {
  return {
    sessions: [],
    encounteredTypes: {},
    totalSessions: 0,
    totalFixes: 0,
  };
}

/**
 * Reset player history
 */
export function resetHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

/**
 * Start a new game session
 * Requirements: 5.1
 */
export function startSession(
  sessionId: string,
  difficulty: 'easy' | 'hard',
  vulnerabilities: string[]
): SessionRecord {
  const history = getHistory();

  const session: SessionRecord = {
    sessionId,
    startedAt: new Date().toISOString(),
    difficulty,
    vulnerabilities,
    fixedCount: 0,
    totalCount: vulnerabilities.length,
  };

  history.sessions.push(session);
  history.totalSessions++;

  // Update encountered types
  vulnerabilities.forEach(type => {
    history.encounteredTypes[type] = (history.encounteredTypes[type] || 0) + 1;
  });

  saveHistory(history);
  return session;
}

/**
 * Record a vulnerability fix
 * Requirements: 5.2
 */
export function recordFix(sessionId: string, _vulnerabilityType: string): void {
  const history = getHistory();
  const session = history.sessions.find(s => s.sessionId === sessionId);

  if (!session) {
    console.warn(`Session ${sessionId} not found`);
    return;
  }

  session.fixedCount++;
  history.totalFixes++;

  saveHistory(history);
}

/**
 * Complete a game session
 * Requirements: 5.1
 */
export function completeSession(sessionId: string): void {
  const history = getHistory();
  const session = history.sessions.find(s => s.sessionId === sessionId);

  if (!session) {
    console.warn(`Session ${sessionId} not found`);
    return;
  }

  session.completedAt = new Date().toISOString();
  saveHistory(history);
}

/**
 * Get statistics from player history
 * Requirements: 5.4
 */
export function getStatistics(): {
  totalSessions: number;
  totalFixes: number;
  uniqueCategories: string[];
  mostEncountered: Array<{ type: string; count: number }>;
  completionRate: number;
} {
  const history = getHistory();

  const uniqueCategories = Object.keys(history.encounteredTypes);
  
  const mostEncountered = Object.entries(history.encounteredTypes)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  const completedSessions = history.sessions.filter(s => s.completedAt).length;
  const completionRate = history.totalSessions > 0 
    ? (completedSessions / history.totalSessions) * 100 
    : 0;

  return {
    totalSessions: history.totalSessions,
    totalFixes: history.totalFixes,
    uniqueCategories,
    mostEncountered,
    completionRate,
  };
}

/**
 * Get recently encountered vulnerability types
 * Requirements: 5.5
 */
export function getRecentlyEncountered(limit: number = 5): string[] {
  const history = getHistory();
  
  // Get last N sessions
  const recentSessions = history.sessions.slice(-limit);
  
  // Flatten vulnerability types
  const recentTypes = recentSessions.flatMap(s => s.vulnerabilities);
  
  // Return unique types
  return [...new Set(recentTypes)];
}

/**
 * Get vulnerability types to avoid (for variety)
 * Requirements: 5.5
 */
export function getTypesToAvoid(): string[] {
  // Get types from last 2 sessions
  return getRecentlyEncountered(2);
}
