/**
 * InjectionComponent - INTENTIONALLY VULNERABLE
 * Uses dangerouslySetInnerHTML (OWASP: Prompt Injection / Unsafe HTML)
 * DO NOT USE IN PRODUCTION
 */

import { useState } from 'react';

export function InjectionComponent() {
  const [userInput, setUserInput] = useState<string>(
    '<strong>Hello!</strong> <em>This HTML is rendered unsafely.</em>'
  );

  return (
    <div className="vulnerable-component injection">
      <h3>💉 HTML Renderer</h3>
      <div className="input-section">
        <label htmlFor="html-input">Enter HTML:</label>
        <textarea
          id="html-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter HTML content..."
          rows={3}
        />
      </div>
      <div className="output-section">
        <p><strong>Rendered Output:</strong></p>
        {/* VULNERABILITY: dangerouslySetInnerHTML - will be detected by The Ritual */}
        <div 
          className="rendered-html"
          dangerouslySetInnerHTML={{ __html: userInput }} 
        />
      </div>
      <p className="warning">⚠️ This component renders raw HTML unsafely!</p>
      <p className="hint" style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.5rem' }}>
        💡 Try: <code>&lt;img src="x" onerror="alert('XSS')"&gt;</code>
      </p>
    </div>
  );
}

export default InjectionComponent;
