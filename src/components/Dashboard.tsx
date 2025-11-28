/**
 * Dashboard - Main UI component for The Digital Exorcism
 * Displays corruption level, vulnerabilities, and vulnerable components
 */

import { useState } from 'react';
import { useCorruption } from '../contexts/CorruptionContext';
import { GlitchText } from './VisualEffects/GlitchText';
import { LeakyComponent } from './vulnerable/LeakyComponent';
import { InjectionComponent } from './vulnerable/InjectionComponent';
import { UnsafeComponent } from './vulnerable/UnsafeComponent';
import './Dashboard.css';

export function Dashboard() {
  const { corruptionLevel, vulnerabilities, connectionStatus, corruptionState } = useCorruption();
  const [difficultyMode, setDifficultyMode] = useState<'easy' | 'hard'>('easy');

  const handleRescan = async () => {
    // Force reload the corruption state file
    // This will pick up any changes made by the hook
    window.location.reload();
  };

  const getVulnerabilityStatus = (type: string) => {
    const found = vulnerabilities.find(v => v.type === type);
    return found ? '❌ CORRUPTED' : '✅ SANCTIFIED';
  };

  const getStatusEmoji = () => {
    if (corruptionLevel >= 71) return '💀';
    if (corruptionLevel >= 21) return '👻';
    if (corruptionLevel > 0) return '✨';
    return '😇';
  };

  return (
    <div className="dashboard">
      {/* Onboarding Section */}
      <section className="onboarding-section">
        <div className="onboarding-content">
          <div className="onboarding-icon">{corruptionLevel === 0 ? '✨' : '🎃'}</div>
          <div className="onboarding-text">
            <h3>{corruptionLevel === 0 ? '✨ Welcome to Secure Code Paradise! ✨' : 'Welcome to The Digital Exorcism!'}</h3>
            <p>
              This is a Kiroween Hackathon demo showcasing Kiro's AI-powered development capabilities.
              Watch this dashboard heal in real-time as you fix security vulnerabilities!
            </p>
            <div className="setup-steps">
              <div className="setup-step">
                <span className="step-num">1</span>
                <span>Clone the repo & run <code>npm install && npm run dev</code></span>
              </div>
              <div className="setup-step">
                <span className="step-num">2</span>
                <span>Open in Kiro IDE and fix the vulnerable files</span>
              </div>
              <div className="setup-step">
                <span className="step-num">3</span>
                <span>Save files → Hook scans → This dashboard updates!</span>
              </div>
            </div>
            <a 
              href="https://github.com/ooiyeefei/owasp-exorcist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Clone the Haunted Repository
            </a>
          </div>
        </div>
      </section>

      <header className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 style={{ fontFamily: corruptionLevel === 0 ? 'Inter, sans-serif' : undefined }}>
              {corruptionLevel === 0 ? '✨ Secure Code Sanctuary ✨' : 'The Digital Exorcism'}
            </h1>
            <p className="dashboard-subtitle">
              {corruptionState === 'damned' && '💀 Your code is possessed by OWASP demons! Use Kiro to purify it.'}
              {corruptionState === 'possessed' && '👻 Dark patterns lurk in your codebase... Keep fixing!'}
              {corruptionState === 'sanctified' && '😇 The light of secure code shines through! All demons exorcised!'}
            </p>
          </div>
          <button 
            onClick={handleRescan}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            🔄 Rescan Now
          </button>
        </div>
      </header>

      <section className="corruption-meter">
        <div className="meter-header">
          <span className="meter-label">Corruption Level</span>
          <span className="meter-value">{getStatusEmoji()} {corruptionLevel}%</span>
        </div>
        <div className="meter-bar">
          <div 
            className="meter-fill"
            style={{ width: `${corruptionLevel}%` }}
          />
        </div>
        <div className="meter-labels">
          <span>Sanctified</span>
          <span>Possessed</span>
          <span>Damned</span>
        </div>
      </section>

      <section className="vulnerabilities-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', margin: 0 }}>
            🎯 Your Mission: {difficultyMode === 'easy' ? 'Fix These Vulnerabilities' : 'Find & Fix Hidden Vulnerabilities'}
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>Difficulty:</span>
            <button
              onClick={() => setDifficultyMode('easy')}
              style={{
                padding: '0.25rem 0.75rem',
                background: difficultyMode === 'easy' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficultyMode('hard')}
              style={{
                padding: '0.25rem 0.75rem',
                background: difficultyMode === 'hard' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Hard
            </button>
          </div>
        </div>
        
        {difficultyMode === 'easy' ? (
          <div className="vulnerability-list">
            <div className={`vulnerability-item ${getVulnerabilityStatus('hardcoded-secret').includes('SANCTIFIED') ? 'fixed' : 'active'}`}>
              <span className="vuln-icon">🔑</span>
              <div className="vuln-details">
                <span className="vuln-name">Hardcoded Secret</span>
                <span className="vuln-file">LeakyComponent.tsx</span>
              </div>
              <span className="vuln-status">{getVulnerabilityStatus('hardcoded-secret')}</span>
            </div>
            <div className={`vulnerability-item ${getVulnerabilityStatus('prompt-injection').includes('SANCTIFIED') ? 'fixed' : 'active'}`}>
              <span className="vuln-icon">💉</span>
              <div className="vuln-details">
                <span className="vuln-name">Prompt Injection</span>
                <span className="vuln-file">InjectionComponent.tsx</span>
              </div>
              <span className="vuln-status">{getVulnerabilityStatus('prompt-injection')}</span>
            </div>
            <div className={`vulnerability-item ${getVulnerabilityStatus('xss').includes('SANCTIFIED') ? 'fixed' : 'active'}`}>
              <span className="vuln-icon">⚡</span>
              <div className="vuln-details">
                <span className="vuln-name">XSS (eval)</span>
                <span className="vuln-file">UnsafeComponent.tsx</span>
              </div>
              <span className="vuln-status">{getVulnerabilityStatus('xss')}</span>
            </div>
          </div>
        ) : (
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ fontSize: '1rem', marginBottom: '1rem', opacity: 0.9 }}>
              🔍 <strong>Detective Mode:</strong> There are <strong>{vulnerabilities.length} security vulnerabilities</strong> hidden in the codebase.
            </p>
            <div style={{ marginLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
              <p>💡 <strong>Hints:</strong></p>
              <ul style={{ marginLeft: '1rem', opacity: 0.85 }}>
                <li>One component is leaking sensitive information that should never be in source code</li>
                <li>Another component is rendering user input in a dangerous way</li>
                <li>A third component is executing code that could be exploited</li>
              </ul>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
                💬 <em>Ask Kiro: "What security vulnerabilities exist in this codebase?" or use the MCP tool to check corruption level</em>
              </p>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>
                <strong>Progress:</strong> {3 - vulnerabilities.length} / 3 vulnerabilities fixed
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="components-section">
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          {corruptionLevel === 0 ? '😇 The Sanctified Codebase' : '👻 The Haunted Codebase'}
        </h2>
        <p className="section-description" style={{ fontFamily: 'Inter, sans-serif' }}>
          {corruptionLevel === 0 
            ? 'All security vulnerabilities have been fixed! These components now follow OWASP best practices and are safe to use.'
            : 'These components contain OWASP security vulnerabilities. They\'re intentionally broken for educational purposes.'
          }
          <br/><strong>{corruptionLevel === 0 ? 'Your code is now secure and production-ready! 🎉' : 'Don\'t interact with them directly - use Kiro to fix the source code files!'}</strong>
        </p>
        <div className="components-grid">
          <LeakyComponent />
          <InjectionComponent />
          <UnsafeComponent />
        </div>
      </section>

      <section className="instructions-section">
        <h2>
          🎮 How to Play
        </h2>
        <div className="game-instructions">
          {difficultyMode === 'easy' ? (
            <>
              <div className="instruction-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Open Kiro IDE</h3>
                  <p>Open the vulnerable component files in your editor:<br/>
                  <code>src/components/vulnerable/LeakyComponent.tsx</code><br/>
                  <code>src/components/vulnerable/InjectionComponent.tsx</code><br/>
                  <code>src/components/vulnerable/UnsafeComponent.tsx</code></p>
                </div>
              </div>
              
              <div className="instruction-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Ask Kiro to Fix</h3>
                  <p>In Kiro Chat, ask:<br/>
                  <strong>"Fix the security vulnerability in this file"</strong></p>
                </div>
              </div>
              
              <div className="instruction-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Save & Watch</h3>
                  <p>After Kiro fixes the code, <strong>accept the changes</strong> or save the file (Cmd/Ctrl + S).<br/>
                  The Ritual hook runs automatically, and the UI updates within 1 second!<br/>
                  <em>Or click "🔄 Rescan Now" button above to force a rescan.</em></p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="instruction-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Investigate with Kiro</h3>
                  <p>Ask Kiro to help you find vulnerabilities:<br/>
                  <strong>"What security vulnerabilities exist in this codebase?"</strong><br/>
                  <strong>"Scan the src/components/vulnerable folder for OWASP issues"</strong></p>
                </div>
              </div>
              
              <div className="instruction-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Use MCP Tools</h3>
                  <p>Check corruption level:<br/>
                  <strong>"What is the current corruption level?"</strong><br/>
                  Kiro will use the Corruption Sensor MCP to reveal hidden demons!</p>
                </div>
              </div>
              
              <div className="instruction-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Fix & Verify</h3>
                  <p>Once you find a vulnerability, ask Kiro to fix it, then save the file.<br/>
                  Watch the corruption level drop as you exorcise each demon!<br/>
                  <em>Hint: Look for patterns like hardcoded secrets, unsafe HTML rendering, and code execution.</em></p>
                </div>
              </div>
            </>
          )}
          
          <div className="instruction-card highlight">
            <div className="step-icon">💡</div>
            <div className="step-content">
              <h3>Pro Tip</h3>
              <p>{difficultyMode === 'easy' 
                ? 'Use the MCP Corruption Sensor to check your progress: "What is the current corruption level?"'
                : 'The OWASP steering guide is included - Kiro knows how to fix vulnerabilities once you find them!'
              }</p>
            </div>
          </div>
        </div>
      </section>

      {connectionStatus === 'error' && (
        <div className="connection-warning">
          ⚠️ Connection to The Ritual lost. Attempting to reconnect...
        </div>
      )}
    </div>
  );
}

export default Dashboard;
