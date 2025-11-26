# Design Document: The Digital Exorcism

## Overview

The Digital Exorcism is a self-aware React application that monitors its own source code for security vulnerabilities and responds with visual and audio degradation. The system consists of three primary layers: a Node.js-based code analysis hook (The Ritual), a React frontend with dynamic corruption effects (The Corruption Engine), and a file-based state synchronization mechanism. The application demonstrates Kiro's Agent Hooks, Steering documents, and Spec-driven development while creating an immersive horror-to-harmony experience.

## Architecture

### High-Level System Diagram (Updated with MCP)

```
┌─────────────────────────────────────────────────────────────┐
│                     Kiro IDE Environment                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  User edits vulnerable/*.tsx files                     │ │
│  │  Prompts Kiro: "Fix this security issue"              │ │
│  └────────────────┬───────────────────────────────────────┘ │
│                   │ 1. File Save Event                       │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  The Ritual (Agent Hook + Watcher)                     │ │
│  │  .kiro/hooks/measure-corruption.js                     │ │
│  │  (Scans code -> Writes JSON)                           │ │
│  └────────────────┬───────────────────────────────────────┘ │
│                   │ 2. Writes State                          │
└───────────────────┼──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│           Corruption State File (JSON)                       │
│  public/corruption-state.json                               │
└────────┬───────────────────────────────────┬────────────────┘
         │ 3. Polled by App                  │ 4. Read by MCP
         ▼                                   ▼
┌─────────────────────────┐       ┌─────────────────────────┐
│ React Frontend          │       │ MCP Server (Local)      │
│ (Visuals + Audio)       │       │ src/mcp/server.ts       │
│                         │       │                         │
│ ┌─────────────────────┐ │       │ Tool:                   │
│ │ SeanceOverlay       │ │       │ get_corruption_level    │
│ │ (Audio Init)        │ │       │                         │
│ └─────────────────────┘ │       └──────────┬──────────────┘
│                         │                  │
│ ┌─────────────────────┐ │       ┌──────────▼──────────────┐
│ │ CorruptionContext   │ │       │ Kiro Chat Context       │
│ │ (State + CSS Vars)  │ │       │ "The corruption is high"│
│ └─────────────────────┘ │       └─────────────────────────┘
│                         │
│ ┌─────────────────────┐ │
│ │ Visual Effect Layer │ │
│ │ (SVG + CSS)         │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Auditory            │ │
│ │ Hallucinations      │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

### Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS Modules + CSS Custom Properties
- **Audio**: WebAudio API
- **Code Analysis**: Node.js (fs, path modules)
- **State Sync**: JSON file polling via fetch API
- **MCP Integration**: @modelcontextprotocol/sdk
- **Fonts**: Google Fonts (Inter, Creepster/Rubik Glitch)

## Components and Interfaces

### 1. The Ritual (Agent Hook)

**Location**: `.kiro/hooks/measure-corruption.js`

**Purpose**: Automated code scanner that runs on file save events to detect OWASP vulnerabilities.

**Interface**:
```javascript
// Hook Configuration (in .kiro/hooks/config.json or similar)
{
  "trigger": "onFileSave",
  "filePattern": "src/components/vulnerable/**/*.tsx",
  "script": ".kiro/hooks/measure-corruption.js"
}

// Output Format (public/corruption-state.json)
interface CorruptionState {
  corruptionLevel: number; // 0-100
  vulnerabilities: Array<{
    type: 'prompt-injection' | 'hardcoded-secret' | 'xss';
    file: string;
    line?: number;
    pattern: string;
  }>;
  timestamp: number;
  lastScan: string; // ISO timestamp
}
```

**Detection Logic**:

```javascript
// Vulnerability Patterns
const PATTERNS = {
  promptInjection: {
    regex: /dangerouslySetInnerHTML|innerHTML\s*=/gi,
    weight: 33,
    description: 'Unsafe HTML rendering detected'
  },
  hardcodedSecret: {
    regex: /sk-[a-zA-Z0-9]{20,}|api[_-]?key\s*=\s*["'][^"']+["']/gi,
    weight: 33,
    description: 'Hardcoded API key or secret detected'
  },
  xss: {
    regex: /eval\(|document\.write|\.innerHTML|new Function\(/gi,
    weight: 34,
    description: 'XSS vulnerability pattern detected'
  }
};

// Scoring Algorithm
function calculateCorruption(vulnerabilities) {
  let score = 0;
  vulnerabilities.forEach(vuln => {
    score += PATTERNS[vuln.type].weight;
  });
  return Math.min(score, 100);
}
```

**Implementation Details**:
- Uses Node.js `fs.readFileSync()` to read files in `/src/components/vulnerable/`
- Runs regex patterns against file contents
- Aggregates results and calculates weighted corruption score
- Writes atomic JSON file to `public/corruption-state.json`
- Includes error handling for file access issues

**Critical Vite Configuration**:
To prevent Vite from triggering a full page reload when the JSON file updates, the hook must write to `public/corruption-state.json` and `vite.config.ts` must exclude this file from HMR:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/public/corruption-state.json'] // CRITICAL: Prevents reload loop
    }
  }
});
```

### 2. Corruption Context (State Management)

**Location**: `src/contexts/CorruptionContext.tsx`

**Purpose**: Central state manager that polls the corruption state file and provides corruption data to all components.

**Interface**:
```typescript
interface CorruptionContextValue {
  corruptionLevel: number;
  vulnerabilities: Vulnerability[];
  isLoading: boolean;
  lastUpdate: Date | null;
  connectionStatus: 'connected' | 'disconnected' | 'error';
}

interface CorruptionProviderProps {
  children: React.ReactNode;
  pollInterval?: number; // default 1000ms
}

// Public API
export const useCorruption = () => useContext(CorruptionContext);
```

**Implementation Details**:
- Uses `useEffect` with `setInterval` to poll JSON file every 1000ms
- Implements exponential backoff (1s, 2s, 4s) if file not found
- Updates CSS custom properties on `:root` element when corruption changes
- Provides connection status for UI feedback

**CSS Variable Injection**:
```typescript
function injectCSSVariables(level: number) {
  const root = document.documentElement;
  
  // Normalized 0-1 value
  const intensity = level / 100;
  
  root.style.setProperty('--corruption-intensity', intensity.toString());
  root.style.setProperty('--corruption-blur', `${intensity * 10}px`);
  root.style.setProperty('--corruption-hue', `${intensity * 180}deg`);
  root.style.setProperty('--corruption-saturation', `${100 + intensity * 200}%`);
  root.style.setProperty('--corruption-brightness', `${100 - intensity * 50}%`);
  root.style.setProperty('--corruption-overlay-opacity', intensity.toString());
  root.style.setProperty('--corruption-glitch-amount', `${intensity * 20}px`);
}
```

### 3. Visual Effect Layer

**Location**: `src/components/VisualEffects/`

**Purpose**: Applies corruption-based visual styling using CSS custom properties and SVG filters.

**Components**:

#### 3.1 CorruptionFilter (SVG Filter Component)
```typescript
interface CorruptionFilterProps {
  corruptionLevel: number;
}

// Renders SVG filter definitions
<svg style={{ position: 'absolute', width: 0, height: 0 }}>
  <defs>
    <filter id="corruption-filter">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency={baseFreq} 
        numOctaves="3" 
      />
      <feDisplacementMap in="SourceGraphic" scale={scale} />
      <feColorMatrix type="hueRotate" values={hueRotate} />
    </filter>
  </defs>
</svg>
```

#### 3.2 CorruptionOverlay (Red Tint Component)
```typescript
// Positioned absolutely over entire viewport
<div 
  className="corruption-overlay"
  style={{
    opacity: 'var(--corruption-overlay-opacity)',
    background: 'radial-gradient(circle, rgba(255,0,0,0.3), rgba(139,0,0,0.7))',
    mixBlendMode: 'multiply',
    pointerEvents: 'none'
  }}
/>
```

#### 3.3 GlitchText (Typography Component)
```typescript
interface GlitchTextProps {
  children: string;
  corruptionLevel: number;
}

// Applies data-text attribute for CSS pseudo-element glitch
<span 
  className="glitch-text"
  data-text={children}
  style={{
    fontFamily: corruptionLevel > 70 ? 'Creepster' : 'Inter',
    animation: corruptionLevel > 50 ? 'glitch 0.3s infinite' : 'none'
  }}
>
  {children}
</span>
```

**CSS Implementation**:
```css
/* Sanctified State (0-20) */
.app-container[data-corruption="sanctified"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  animation: heavenly-glow 3s ease-in-out infinite;
}

/* Possessed State (21-70) */
.app-container[data-corruption="possessed"] {
  filter: url(#corruption-filter);
  animation: jitter 0.1s infinite;
}

/* Damned State (71-100) */
.app-container[data-corruption="damned"] {
  filter: url(#corruption-filter) invert(0.8);
  animation: screen-tear 0.5s infinite;
  font-family: 'Creepster', cursive;
}

@keyframes jitter {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-2px, -2px); }
}

@keyframes screen-tear {
  0% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(10% 0 0 0); }
  40% { clip-path: inset(0 0 10% 0); }
  60% { clip-path: inset(0 10% 0 0); }
  80% { clip-path: inset(0 0 0 10%); }
  100% { clip-path: inset(0 0 0 0); }
}
```

### 4. MCP Integration (Corruption Sensor)

**Location**: `src/mcp/corruption-server.ts`

**Purpose**: Allows the Kiro AI Agent to "sense" the corruption level of the app it is editing, demonstrating MCP integration for judging criteria.

**Interface**:
```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as fs from 'fs';

// Create MCP server
const server = new McpServer({
  name: "CorruptionSensor",
  version: "1.0.0"
});

// Tool: Get Current Corruption Level
server.tool(
  "get_corruption_level",
  {
    description: "Reads the current corruption level and active vulnerabilities from the haunted codebase"
  },
  async () => {
    try {
      const state = JSON.parse(
        fs.readFileSync('public/corruption-state.json', 'utf-8')
      );
      
      return {
        content: [{
          type: "text",
          text: `Current Corruption Level: ${state.corruptionLevel}%. ` +
                `Active Vulnerabilities: ${state.vulnerabilities.length}. ` +
                `Details: ${state.vulnerabilities.map(v => `${v.type} in ${v.file}`).join(', ')}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: "Unable to sense corruption. The Ritual may not have run yet."
        }]
      };
    }
  }
);

// Start server
const transport = new StdioServerTransport();
server.connect(transport);
```

**MCP Configuration** (`.kiro/settings/mcp.json`):
```json
{
  "mcpServers": {
    "corruption-sensor": {
      "command": "node",
      "args": ["src/mcp/corruption-server.ts"],
      "disabled": false,
      "autoApprove": ["get_corruption_level"]
    }
  }
}
```

**Usage Narrative**: 
When the user asks Kiro "How bad is the damage?", Kiro calls `get_corruption_level` and responds: "The corruption is critical (80%). I detect a Hardcoded Secret in LeakyComponent.tsx. Shall I perform the ritual?"

### 5. Auditory Hallucinations (Audio System)

**Location**: `src/hooks/useAudioCorruption.ts`

**Purpose**: WebAudio-based soundscape that reflects corruption level.

**Critical Browser Policy Constraint**: Chrome and other browsers block AudioContext autoplay. The audio system requires user interaction to initialize.

**Interface**:
```typescript
interface AudioCorruptionConfig {
  enabled: boolean;
  volume: number; // 0-1
}

function useAudioCorruption(corruptionLevel: number, config: AudioCorruptionConfig) {
  // Returns control methods
  return {
    initAudio: () => void;  // MUST be called from user interaction
    play: () => void;
    pause: () => void;
    setVolume: (vol: number) => void;
  };
}
```

**Implementation**:
```typescript
// Audio Context Setup
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

// Corruption-based frequency mapping
function getFrequency(level: number): number {
  if (level > 50) {
    // Dissonant low frequency (40-80 Hz)
    return 40 + (level - 50) * 0.8;
  } else {
    // Harmonious frequencies (220-440 Hz, A3-A4)
    return 220 + level * 4.4;
  }
}

// Waveform selection
function getWaveform(level: number): OscillatorType {
  return level > 50 ? 'sawtooth' : 'sine';
}

// Initialization (requires user interaction)
function initAudio() {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  oscillator.start();
}

// Update on corruption change
useEffect(() => {
  if (audioContext.state === 'running') {
    oscillator.frequency.setValueAtTime(
      getFrequency(corruptionLevel),
      audioContext.currentTime
    );
    oscillator.type = getWaveform(corruptionLevel);
  }
}, [corruptionLevel]);

// Interaction sounds
function playInteractionSound(type: 'click' | 'hover') {
  if (corruptionLevel > 50 && audioContext.state === 'running') {
    const noise = audioContext.createBufferSource();
    // Generate distorted noise buffer
    playDistortedSound(noise);
  }
}
```

### 6. Seance Overlay (Audio Initialization Gate)

**Location**: `src/components/SeanceOverlay.tsx`

**Purpose**: Forces a user interaction to unlock AudioContext before the corruption experience starts, complying with browser autoplay policies.

**Interface**:
```typescript
interface SeanceOverlayProps {
  onStart: () => void;
}

export function SeanceOverlay({ onStart }: SeanceOverlayProps) {
  const [started, setStarted] = useState(false);
  const { initAudio } = useAudioCorruption();
  
  if (started) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        onClick={() => {
          initAudio(); // Resumes AudioContext
          setStarted(true);
          onStart();
        }}
        className="text-red-500 border border-red-500 px-8 py-4 font-creepster text-2xl animate-pulse hover:bg-red-900/20 transition-colors"
      >
        ENTER THE NIGHTMARE
      </button>
    </div>
  );
}
```

**Styling**:
```css
/* SeanceOverlay.module.css */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(circle, rgba(0,0,0,0.95), rgba(0,0,0,1));
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in 1s ease-in;
}

.button {
  font-family: 'Creepster', cursive;
  font-size: 2rem;
  color: #dc2626;
  border: 2px solid #dc2626;
  padding: 2rem 4rem;
  background: transparent;
  cursor: pointer;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: rgba(220, 38, 38, 0.2);
}
```

### 7. The Haunted Codebase (Vulnerable Components)

**Location**: `src/components/vulnerable/`

**Purpose**: Intentionally insecure React components that ship with the repository.

#### 5.1 LeakyComponent.tsx
```typescript
// INTENTIONALLY VULNERABLE - DO NOT USE IN PRODUCTION
export function LeakyComponent() {
  // Hardcoded API key (will be detected by The Ritual)
  const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz";
  
  return (
    <div className="leaky-component">
      <h2>API Configuration</h2>
      <p>API Key: {API_KEY}</p>
      <p>This component exposes sensitive data!</p>
    </div>
  );
}
```

#### 5.2 InjectionComponent.tsx
```typescript
// INTENTIONALLY VULNERABLE - DO NOT USE IN PRODUCTION
export function InjectionComponent() {
  const [userInput, setUserInput] = useState("");
  
  // Dangerous HTML rendering (will be detected by The Ritual)
  return (
    <div className="injection-component">
      <input 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter HTML..."
      />
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
    </div>
  );
}
```

#### 5.3 UnsafeComponent.tsx
```typescript
// INTENTIONALLY VULNERABLE - DO NOT USE IN PRODUCTION
export function UnsafeComponent() {
  const [code, setCode] = useState("");
  
  // XSS vulnerability via eval (will be detected by The Ritual)
  const executeCode = () => {
    eval(code);
  };
  
  return (
    <div className="unsafe-component">
      <textarea 
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter JavaScript code..."
      />
      <button onClick={executeCode}>Execute</button>
    </div>
  );
}
```

### 8. Dashboard Component

**Location**: `src/components/Dashboard.tsx`

**Purpose**: Main UI that displays corruption status and vulnerable components.

**Interface**:
```typescript
interface DashboardProps {
  // No props needed - uses CorruptionContext
}
```

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│  Corruption Level: 67%                              │
│  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                     │
│  Active Vulnerabilities:                           │
│  ⚠️ Hardcoded Secret (LeakyComponent.tsx)          │
│  ⚠️ Prompt Injection (InjectionComponent.tsx)      │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  [Vulnerable Component Display Area]        │  │
│  │  - Shows LeakyComponent                     │  │
│  │  - Shows InjectionComponent                 │  │
│  │  - Shows UnsafeComponent                    │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  Instructions:                                     │
│  Use Kiro to fix the vulnerabilities above.       │
│  Watch the dashboard heal in real-time!           │
└─────────────────────────────────────────────────────┘
```

## Data Models

### CorruptionState (JSON File Schema)
```typescript
interface CorruptionState {
  corruptionLevel: number;        // 0-100
  vulnerabilities: Vulnerability[];
  timestamp: number;               // Unix timestamp
  lastScan: string;                // ISO 8601 timestamp
  scanDuration: number;            // milliseconds
}

interface Vulnerability {
  type: 'prompt-injection' | 'hardcoded-secret' | 'xss';
  file: string;                    // Relative path
  line?: number;                   // Optional line number
  pattern: string;                 // Matched regex pattern
  severity: 'high' | 'medium' | 'low';
}
```

### React Context State
```typescript
interface CorruptionContextState {
  corruptionLevel: number;
  vulnerabilities: Vulnerability[];
  isLoading: boolean;
  lastUpdate: Date | null;
  connectionStatus: 'connected' | 'disconnected' | 'error';
  error: Error | null;
}
```

## Error Handling

### The Ritual (Hook) Errors
- **File Access Errors**: Log to console, write error state to JSON with `corruptionLevel: -1`
- **Regex Errors**: Skip pattern, continue with other patterns
- **JSON Write Errors**: Retry once, then log error

### Frontend Errors
- **Polling Errors**: Implement exponential backoff (1s, 2s, 4s, max 8s)
- **JSON Parse Errors**: Display error state in UI, maintain last known good state
- **Audio Context Errors**: Gracefully disable audio, show muted indicator
- **CSS Variable Injection Errors**: Fallback to default styling

### Error UI States
```typescript
// Connection Lost State
<div className="error-banner">
  ⚠️ Connection to The Ritual lost. Retrying...
</div>

// Invalid State
<div className="error-banner">
  ❌ Corruption state invalid. Please check the hook configuration.
</div>
```

## Testing Strategy

### Unit Tests
- **CorruptionContext**: Test polling logic, CSS variable injection, state updates
- **useAudioCorruption**: Test frequency calculations, waveform selection, initialization flow
- **Visual Components**: Test corruption level prop handling, CSS class application
- **MCP Server**: Test `get_corruption_level` tool with mock JSON file

### Integration Tests
- **File Polling**: Mock fetch API, test state synchronization
- **Hook Execution**: Test regex pattern matching, scoring algorithm
- **End-to-End Flow**: Save vulnerable file → Hook runs → JSON updates → UI reflects change
- **MCP Integration**: Test Kiro chat calling `get_corruption_level` and receiving correct data

### Manual Testing Scenarios
1. **Initial Load**: Verify SeanceOverlay appears, click "ENTER THE NIGHTMARE"
2. **Audio Initialization**: Verify audio starts after button click (no autoplay errors)
3. **Corruption Level 100**: Verify all three vulnerabilities detected
4. **MCP Test**: Ask Kiro "Check corruption status" and verify it reads the level correctly
5. **Fix Prompt Injection**: Remove `dangerouslySetInnerHTML`, verify level drops to ~67
6. **Fix Hardcoded Secret**: Replace with `process.env`, verify level drops to ~34
7. **Fix XSS**: Remove `eval()`, verify level drops to 0
8. **Audio Transitions**: Verify smooth frequency changes during fixes
9. **Visual Transitions**: Verify smooth CSS transitions between corruption states
10. **HMR Check**: Verify no page reload when JSON file updates

### Performance Testing
- **Polling Overhead**: Ensure <5ms per poll cycle
- **CSS Variable Updates**: Ensure <16ms (60fps) for visual updates
- **Audio Processing**: Ensure no audio glitches during frequency changes
- **File Scanning**: Ensure hook completes in <500ms for typical file sizes
- **HMR Performance**: Verify Vite ignores JSON file changes and doesn't trigger reload

## Kiro Integration Points

### 1. Steering Document

**Location**: `.kiro/steering/owasp-guide.md`

**Content Structure**:
```markdown
# The Exorcism Rules: OWASP Security Fixes

## Rule 1: Never Hardcode Secrets
❌ Bad:
const API_KEY = "sk-abc123...";

✅ Good:
const API_KEY = import.meta.env.VITE_API_KEY;

## Rule 2: Never Use dangerouslySetInnerHTML
❌ Bad:
<div dangerouslySetInnerHTML={{ __html: userInput }} />

✅ Good:
<div>{DOMPurify.sanitize(userInput)}</div>

## Rule 3: Never Use eval() or Direct DOM Manipulation
❌ Bad:
eval(userCode);

✅ Good:
// Use a sandboxed environment or avoid dynamic code execution
```

### 2. Agent Hook Configuration

**Location**: `.kiro/hooks/config.json` (or similar)

```json
{
  "hooks": [
    {
      "name": "measure-corruption",
      "trigger": "onFileSave",
      "filePattern": "src/components/vulnerable/**/*.{ts,tsx}",
      "script": ".kiro/hooks/measure-corruption.js",
      "enabled": true
    }
  ]
}
```

### 3. Spec-Driven Development Evidence

The `.kiro/specs/digital-exorcism/` directory contains:
- `requirements.md` - This document's source requirements
- `design.md` - This design document
- `tasks.md` - Implementation task list (to be generated)

## Deployment Considerations

### Development Mode
- Vite dev server on `localhost:5173`
- The Ritual hook runs on file save
- Hot module replacement for instant UI updates (with JSON file excluded)
- MCP server runs via Kiro's MCP configuration

### Production Build
- Static build via `vite build`
- Corruption state file served from `dist/corruption-state.json`
- Hook can run as a separate Node.js process or GitHub Action
- MCP server can be packaged as standalone Node.js script

### Demo Mode (for Hackathon Video - The 3-Minute Win)

**Preparation**:
1. Set `corruption-state.json` to 100 manually
2. Clear browser cache
3. Ensure MCP server is running and configured in Kiro

**The Flow** (3-minute demo script):
- **0:00**: Click "ENTER THE NIGHTMARE". Audio drone starts (low/scary sawtooth wave)
- **0:30**: Open Kiro Chat. Ask: "Check corruption status" (demonstrates MCP usage)
- **1:00**: Kiro responds with corruption level 100% and lists vulnerabilities
- **1:30**: Open `LeakyComponent.tsx`. Highlight hardcoded secret. Prompt Kiro: "Fix this secret"
- **2:00**: Save file. Hook triggers. Audio shifts to sine wave. Visuals clear up (glassmorphism appears)
- **2:30**: Show git commit via Kiro, triggering final "Sanctified" message with 0% corruption

**Key Demo Points to Highlight**:
- MCP integration (Kiro "sensing" corruption)
- Agent Hook (automatic code scanning)
- Steering document (Kiro knowing how to fix vulnerabilities)
- Real-time visual/audio feedback
- Spec-driven development (show .kiro directory structure)

## Future Enhancements (Out of Scope)

- Real-time collaboration: Multiple users fixing vulnerabilities simultaneously
- Difficulty levels: More complex vulnerability patterns
- Achievement system: Badges for fixing specific vulnerability types
- Export functionality: Generate security audit reports
- Integration with actual SAST tools: Use real security scanners instead of regex
