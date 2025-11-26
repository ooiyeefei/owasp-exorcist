/**
 * Dashboard - Main UI component for The Digital Exorcism
 * Displays corruption level, vulnerabilities, and vulnerable components
 */

import { useCorruption } from '../contexts/CorruptionContext';
import { GlitchText } from './VisualEffects/GlitchText';
import { LeakyComponent } from './vulnerable/LeakyComponent';
import { InjectionComponent } from './vulnerable/InjectionComponent';
import { UnsafeComponent } from './vulnerable/UnsafeComponent';
import './Dashboard.css';

export function Dashboard() {
  const { corruptionLevel, vulnerabilities, connectionStatus, corruptionState } = useCorruption();

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
      <header className="dashboard-header">
        <GlitchText as="h1">The Digital Exorcism</GlitchText>
        <p className="dashboard-subtitle">
          {corruptionState === 'damned' && 'Your code is possessed by OWASP demons!'}
          {corruptionState === 'possessed' && 'Dark patterns lurk in your codebase...'}
          {corruptionState === 'sanctified' && 'The light of secure code shines through!'}
        </p>
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
        <GlitchText as="h2">Active Vulnerabilities</GlitchText>
        <div className="vulnerability-list">
          <div className={`vulnerability-item ${getVulnerabilityStatus('hardcoded-secret').includes('SANCTIFIED') ? 'fixed' : 'active'}`}>
            <span className="vuln-icon">🔑</span>
            <span className="vuln-name">Hardcoded Secret</span>
            <span className="vuln-status">{getVulnerabilityStatus('hardcoded-secret')}</span>
          </div>
          <div className={`vulnerability-item ${getVulnerabilityStatus('prompt-injection').includes('SANCTIFIED') ? 'fixed' : 'active'}`}>
            <span className="vuln-icon">💉</span>
            <span className="vuln-name">Prompt Injection</span>
            <span className="vuln-status">{getVulnerabilityStatus('prompt-injection')}</span>
          </div>
          <div className={`vulnerability-item ${getVulnerabilityStatus('xss').includes('SANCTIFIED') ? 'fixed' : 'active'}`}>
            <span className="vuln-icon">⚡</span>
            <span className="vuln-name">XSS (eval)</span>
            <span className="vuln-status">{getVulnerabilityStatus('xss')}</span>
          </div>
        </div>
      </section>

      <section className="components-section">
        <GlitchText as="h2">The Haunted Codebase</GlitchText>
        <p className="section-description">
          These components contain security vulnerabilities. Use Kiro to fix them and watch the corruption fade away.
        </p>
        <div className="components-grid">
          <LeakyComponent />
          <InjectionComponent />
          <UnsafeComponent />
        </div>
      </section>

      <section className="instructions-section">
        <GlitchText as="h2">How to Perform the Exorcism</GlitchText>
        <ol className="instructions-list">
          <li>Open a vulnerable component file in the editor</li>
          <li>Ask Kiro: "Fix the security vulnerability in this file"</li>
          <li>Save the file to trigger The Ritual (code scanner)</li>
          <li>Watch the corruption level decrease and visuals heal</li>
          <li>Repeat until all demons are exorcised!</li>
        </ol>
        <p className="kiro-tip">
          💡 <strong>Tip:</strong> Ask Kiro "What is the current corruption level?" to use the MCP Corruption Sensor!
        </p>
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
