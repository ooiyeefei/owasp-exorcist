/**
 * Dashboard Dynamic - Enhanced Dashboard with dynamic component loading
 * Supports both static and dynamically generated vulnerable components
 * Requirements: 7.1, 7.2, 10.1
 */

import { useState, useEffect, Suspense } from 'react';
import { useCorruption } from '../contexts/CorruptionContext';
import './Dashboard.css';

export function DashboardDynamic() {
  const { corruptionLevel, vulnerabilities, connectionStatus, corruptionState, fullState } = useCorruption();
  const [generatedComponents, setGeneratedComponents] = useState<React.ComponentType[]>([]);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [useGenerated, setUseGenerated] = useState(false);
  const [loadedSessionId, setLoadedSessionId] = useState<string | null>(null);

  // Check if we have generated components
  useEffect(() => {
    const hasGenerated = fullState && 
      fullState.generatedComponents && 
      fullState.generatedComponents.length > 0;
    
    setUseGenerated(hasGenerated || false);
    
    // Only load if we have a new session (prevent re-loading on every state update)
    if (hasGenerated && fullState.sessionId !== loadedSessionId) {
      loadGeneratedComponents();
      setLoadedSessionId(fullState.sessionId || null);
    }
  }, [fullState, loadedSessionId]);

  const loadGeneratedComponents = async () => {
    if (!fullState?.generatedComponents) return;
    
    setLoadingComponents(true);
    const components: React.ComponentType[] = [];

    for (const meta of fullState.generatedComponents) {
      try {
        // Dynamic import of generated components
        // Note: Vite requires explicit file extensions in dynamic imports
        const module = await import(`./vulnerable/generated/${meta.filename.replace('.tsx', '')}.tsx`);
        components.push(module.default);
      } catch (error) {
        console.error(`Failed to load ${meta.filename}:`, error);
      }
    }

    setGeneratedComponents(components);
    setLoadingComponents(false);
  };

  const handleRescan = async () => {
    window.location.reload();
  };

  const getStatusEmoji = () => {
    if (corruptionLevel >= 71) return '💀';
    if (corruptionLevel >= 21) return '👻';
    if (corruptionLevel > 0) return '✨';
    return '😇';
  };

  // Determine which components to display
  const componentsToRender = generatedComponents;

  return (
    <div className="dashboard">
      {/* Onboarding Section */}
      <section className="onboarding-section">
        <div className="onboarding-content">
          <div className="onboarding-icon">{corruptionLevel === 0 ? '✨' : '🎃'}</div>
          <div className="onboarding-text">
            <h3>{corruptionLevel === 0 ? '✨ Welcome to Secure Code Paradise! ✨' : 'Welcome to The Digital Exorcism!'}</h3>
            <p>
              {corruptionLevel === 0 
                ? '🎉 All demons banished! Your code is pure and secure.'
                : `🎲 ${fullState?.generatedComponents?.length || 3} randomly generated OWASP demons haunt this codebase. Every playthrough is unique!`
              }
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: '0.5rem 0 0 0' }}>
              A Kiroween Hackathon demo powered by Kiro
            </p>
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
              {corruptionState === 'damned' && '💀 Your code is possessed by OWASP demons! Summon Kiro the Digital Exorcist for salvation.'}
              {corruptionState === 'possessed' && '👻 Dark spirits haunt your codebase... Ask Kiro the Ghost Hunter to banish them!'}
              {corruptionState === 'sanctified' && '😇 The light of secure code shines through! Kiro the Guardian has cleansed all demons!'}
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
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', marginBottom: '1rem' }}>
          🎯 Active Vulnerabilities
        </h2>
        
        <div className="vulnerability-list">
          {vulnerabilities.map((vuln, index) => (
            <div key={index} className="vulnerability-item active">
              <span className="vuln-icon">
                {vuln.severity === 'critical' && '🔴'}
                {vuln.severity === 'high' && '🟠'}
                {vuln.severity === 'medium' && '🟡'}
                {vuln.severity === 'low' && '🟢'}
              </span>
              <div className="vuln-details">
                <span className="vuln-name">{vuln.description}</span>
                <span className="vuln-file">{vuln.file}</span>
                {vuln.owaspCategory && (
                  <span className="vuln-category" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    OWASP: {vuln.owaspCategory}
                  </span>
                )}
              </div>
              <span className="vuln-status">❌ CORRUPTED</span>
            </div>
          ))}
          {vulnerabilities.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}>
              <p>✨ No vulnerabilities detected! Your code is secure!</p>
            </div>
          )}
        </div>
      </section>

      <section className="components-section">
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          {corruptionLevel === 0 ? '😇 The Sanctified Codebase' : '👻 The Haunted Codebase'}
        </h2>
        <p className="section-description" style={{ fontFamily: 'Inter, sans-serif' }}>
          {useGenerated && '🎲 These components were dynamically generated for this session. '}
          {corruptionLevel === 0 
            ? 'All security vulnerabilities have been fixed!'
            : 'These components contain OWASP security vulnerabilities.'
          }
        </p>
        
        {corruptionLevel > 0 && (
          <div style={{ 
            background: 'rgba(138, 43, 226, 0.15)', 
            padding: '1.25rem', 
            borderRadius: '12px', 
            marginBottom: '1.5rem',
            border: '2px solid rgba(138, 43, 226, 0.4)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
              🎯 How to Fix Any Vulnerability (4 Simple Steps)
            </h3>
            <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
              <li><strong>Open the file</strong> in Kiro IDE (click on any component below to see its code)</li>
              <li><strong>Look at the code</strong> - find the vulnerability in the source</li>
              <li><strong>Ask Kiro:</strong> "Fix the security vulnerability in this file"</li>
              <li><strong>Watch</strong> the corruption level drop as Kiro applies the fix!</li>
            </ol>
            <p style={{ margin: '1rem 0 0 0', fontSize: '0.9rem', opacity: 0.9, fontStyle: 'italic' }}>
              💡 The input fields in components below are just for <em>testing</em> the vulnerabilities - you don't need to type anything to fix them!
            </p>
          </div>
        )}
        
        {loadingComponents ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>⚡ Loading components...</p>
          </div>
        ) : (
          <div className="components-grid">
            {componentsToRender.map((Component, index) => (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            ))}
          </div>
        )}
      </section>

      {connectionStatus === 'error' && (
        <div className="connection-warning">
          ⚠️ Connection to The Ritual lost. Attempting to reconnect...
        </div>
      )}
    </div>
  );
}

export default DashboardDynamic;
