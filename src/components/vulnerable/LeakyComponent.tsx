/**
 * LeakyComponent - INTENTIONALLY VULNERABLE
 * Contains hardcoded API key (OWASP: Sensitive Data Exposure)
 * DO NOT USE IN PRODUCTION
 */

import { useState } from 'react';

export function LeakyComponent() {
  // VULNERABILITY: Hardcoded API key - will be detected by The Ritual
  const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz1234567890";
  const [status, setStatus] = useState<string>('idle');

  const makeApiCall = async () => {
    setStatus('loading');
    // Simulated API call with exposed key
    console.log(`Making API call with key: ${API_KEY}`);
    setTimeout(() => setStatus('complete'), 1000);
  };

  return (
    <div className="vulnerable-component leaky">
      <h3>🔑 API Configuration</h3>
      <div className="vulnerability-display">
        <p><strong>API Key:</strong></p>
        <code className="exposed-secret">{API_KEY}</code>
      </div>
      <p className="warning">⚠️ This component exposes sensitive data!</p>
      <button onClick={makeApiCall} disabled={status === 'loading'}>
        {status === 'loading' ? 'Calling...' : 'Test API Call'}
      </button>
      <p className="status">Status: {status}</p>
    </div>
  );
}

export default LeakyComponent;
