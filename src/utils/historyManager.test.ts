/**
 * History Manager Tests
 * Test player history tracking functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  getHistory,
  resetHistory,
  startSession,
  recordFix,
  completeSession,
  getStatistics,
  getRecentlyEncountered,
  getTypesToAvoid,
} from './historyManager';

describe('historyManager', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    resetHistory();
  });

  describe('getHistory', () => {
    it('should return empty history initially', () => {
      const history = getHistory();
      
      expect(history.sessions).toHaveLength(0);
      expect(history.totalSessions).toBe(0);
      expect(history.totalFixes).toBe(0);
      expect(Object.keys(history.encounteredTypes)).toHaveLength(0);
    });
  });

  describe('startSession', () => {
    it('should create a new session record (Requirement 5.1)', () => {
      const session = startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      
      expect(session.sessionId).toBe('session-1');
      expect(session.difficulty).toBe('easy');
      expect(session.vulnerabilities).toEqual(['hardcoded-secret', 'xss']);
      expect(session.fixedCount).toBe(0);
      expect(session.totalCount).toBe(2);
      expect(session.startedAt).toBeDefined();
    });

    it('should update encountered types', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      
      const history = getHistory();
      expect(history.encounteredTypes['hardcoded-secret']).toBe(1);
      expect(history.encounteredTypes['xss']).toBe(1);
    });

    it('should increment total sessions', () => {
      startSession('session-1', 'easy', ['hardcoded-secret']);
      startSession('session-2', 'hard', ['xss']);
      
      const history = getHistory();
      expect(history.totalSessions).toBe(2);
    });
  });

  describe('recordFix', () => {
    it('should increment fix count (Requirement 5.2)', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      recordFix('session-1', 'hardcoded-secret');
      
      const history = getHistory();
      const session = history.sessions[0];
      
      expect(session.fixedCount).toBe(1);
      expect(history.totalFixes).toBe(1);
    });

    it('should handle multiple fixes', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss', 'sql-injection']);
      recordFix('session-1', 'hardcoded-secret');
      recordFix('session-1', 'xss');
      
      const history = getHistory();
      const session = history.sessions[0];
      
      expect(session.fixedCount).toBe(2);
      expect(history.totalFixes).toBe(2);
    });
  });

  describe('completeSession', () => {
    it('should mark session as completed (Requirement 5.1)', () => {
      startSession('session-1', 'easy', ['hardcoded-secret']);
      completeSession('session-1');
      
      const history = getHistory();
      const session = history.sessions[0];
      
      expect(session.completedAt).toBeDefined();
    });
  });

  describe('getStatistics', () => {
    it('should calculate statistics correctly (Requirement 5.4)', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      recordFix('session-1', 'hardcoded-secret');
      recordFix('session-1', 'xss');
      completeSession('session-1');

      startSession('session-2', 'hard', ['sql-injection', 'idor']);
      recordFix('session-2', 'sql-injection');
      
      const stats = getStatistics();
      
      expect(stats.totalSessions).toBe(2);
      expect(stats.totalFixes).toBe(3);
      expect(stats.uniqueCategories).toHaveLength(4);
      expect(stats.completionRate).toBe(50); // 1 of 2 completed
    });

    it('should return unique categories', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      startSession('session-2', 'hard', ['hardcoded-secret', 'sql-injection']);
      
      const stats = getStatistics();
      
      expect(stats.uniqueCategories).toContain('hardcoded-secret');
      expect(stats.uniqueCategories).toContain('xss');
      expect(stats.uniqueCategories).toContain('sql-injection');
    });

    it('should sort most encountered types', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      startSession('session-2', 'hard', ['hardcoded-secret', 'sql-injection']);
      startSession('session-3', 'easy', ['hardcoded-secret']);
      
      const stats = getStatistics();
      
      expect(stats.mostEncountered[0].type).toBe('hardcoded-secret');
      expect(stats.mostEncountered[0].count).toBe(3);
    });
  });

  describe('getRecentlyEncountered', () => {
    it('should return recently encountered types (Requirement 5.5)', () => {
      startSession('session-1', 'easy', ['hardcoded-secret', 'xss']);
      startSession('session-2', 'hard', ['sql-injection', 'idor']);
      startSession('session-3', 'easy', ['missing-validation']);
      
      const recent = getRecentlyEncountered(2);
      
      expect(recent).toContain('sql-injection');
      expect(recent).toContain('idor');
      expect(recent).toContain('missing-validation');
      expect(recent).not.toContain('hardcoded-secret');
    });
  });

  describe('getTypesToAvoid', () => {
    it('should return types from last 2 sessions', () => {
      startSession('session-1', 'easy', ['hardcoded-secret']);
      startSession('session-2', 'hard', ['xss']);
      startSession('session-3', 'easy', ['sql-injection']);
      
      const toAvoid = getTypesToAvoid();
      
      expect(toAvoid).toContain('xss');
      expect(toAvoid).toContain('sql-injection');
      expect(toAvoid).not.toContain('hardcoded-secret');
    });
  });

  describe('history persistence', () => {
    it('should persist across getHistory calls (Requirement 5.3)', () => {
      startSession('session-1', 'easy', ['hardcoded-secret']);
      
      const history1 = getHistory();
      const history2 = getHistory();
      
      expect(history1.sessions).toHaveLength(1);
      expect(history2.sessions).toHaveLength(1);
      expect(history1.sessions[0].sessionId).toBe(history2.sessions[0].sessionId);
    });
  });
});
