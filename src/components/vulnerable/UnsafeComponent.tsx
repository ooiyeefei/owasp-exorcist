/**
 * UnsafeComponent - INTENTIONALLY VULNERABLE
 * Uses eval() for code execution (OWASP: XSS / Insecure Output Handling)
 * DO NOT USE IN PRODUCTION
 */

import { useState } from 'react';

export function UnsafeComponent() {
  const [code, setCode] = useState<string>('2 + 2');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const executeCode = () => {
    setError('');
    try {
      // VULNERABILITY: eval() - will be detected by The Ritual
      const output = eval(code);
      setResult(String(output));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
  };

  return (
    <div className="vulnerable-component unsafe">
      <h3>⚡ Code Executor</h3>
      <div className="input-section">
        <label htmlFor="code-input">Enter JavaScript:</label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter JavaScript code..."
          rows={3}
        />
      </div>
      <button onClick={executeCode}>Execute Code</button>
      {result && (
        <div className="result-section">
          <p><strong>Result:</strong></p>
          <code className="result">{result}</code>
        </div>
      )}
      {error && (
        <div className="error-section">
          <p><strong>Error:</strong></p>
          <code className="error">{error}</code>
        </div>
      )}
      <p className="warning">⚠️ This component executes arbitrary code!</p>
    </div>
  );
}

export default UnsafeComponent;
