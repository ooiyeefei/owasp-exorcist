# Implementation Plan

- [x] 1. Set up Kiro-first project structure
  - Create directory `.kiro/specs/` and generate `init.md` spec document first
  - Initialize Vite + React + TypeScript project via Kiro Chat based on the spec
  - CRITICAL: Configure `vite.config.ts` to add `public/corruption-state.json` to the `server.watch.ignored` list (prevents infinite reload loops)
  - Install dependencies: `@modelcontextprotocol/sdk`, `ts-node` (for running MCP server), WebAudio types
  - Create directory structure: `src/components/vulnerable/`, `src/mcp/`, `.kiro/hooks/`, `.kiro/steering/`
  - Set up Google Fonts (Inter, Creepster) in `index.html`
  - _Requirements: 6.4, 7.1, 7.2_

- [x] 2. Create The Ritual (Agent Hook)
  - Create `.kiro/hooks/measure-corruption.js` using CommonJS format (for zero-config execution)
  - Implement file scanning using Node.js `fs` and `path` modules to read all `.tsx` files in `src/components/vulnerable/`
  - Implement regex pattern matching for three vulnerability types: `dangerouslySetInnerHTML` (Prompt Injection), `sk-[a-zA-Z0-9]+` (Hardcoded Secrets), `eval\(` (XSS)
  - Implement weighted scoring algorithm (33/33/34 points per vulnerability type)
  - Write corruption state to `public/corruption-state.json` with corruption level, vulnerabilities array, and timestamp
  - Add error handling for file access and JSON write failures
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Configure Kiro Agent Hook
  - Create or update `.kiro/hooks/config.json` to register the measure-corruption hook
  - Set trigger to `onFileSave` with file pattern `src/components/vulnerable/**/*.tsx`
  - Verify hook execution by manually editing a dummy file in vulnerable directory, saving, and checking if `public/corruption-state.json` updates timestamp
  - _Requirements: 3.1, 6.4_

- [x] 4. Create The Haunted Codebase (Vulnerable Components)
  - Create `src/components/vulnerable/LeakyComponent.tsx` with hardcoded API key matching pattern `sk-[a-zA-Z0-9]{20,}`
  - Create `src/components/vulnerable/InjectionComponent.tsx` using `dangerouslySetInnerHTML`
  - Create `src/components/vulnerable/UnsafeComponent.tsx` with `eval()` function call
  - Verify all three components render without crashing
  - CRITICAL: Commit these files immediately with git so they can be restored via `git checkout` for demo resets
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 5. Implement Corruption Context (State Management)
  - Create `src/contexts/CorruptionContext.tsx` with React Context and Provider
  - Implement polling logic using `useEffect` and `setInterval` (1000ms interval)
  - Implement fetch to read `public/corruption-state.json` and parse corruption level
  - Implement exponential backoff (1s, 2s, 4s) for polling errors
  - Create helper function `injectCSSVariables(level)` to update `:root` CSS custom properties based on corruption level
  - Export `useCorruption` hook for consuming components
  - _Requirements: 5.1, 5.5, 8.1, 8.2, 8.5_

- [x] 6. Implement Visual Effect Layer
- [x] 6.1 Create CorruptionFilter SVG component
  - Create `src/components/VisualEffects/CorruptionFilter.tsx`
  - Implement SVG filter with `feTurbulence`, `feDisplacementMap`, and `feColorMatrix`
  - Calculate `baseFrequency` and `scale` based on corruption level prop
  - _Requirements: 1.1, 1.2, 1.3, 7.3, 7.4_

- [x] 6.2 Create CorruptionOverlay component
  - Create `src/components/VisualEffects/CorruptionOverlay.tsx`
  - Implement fixed-position overlay with red radial gradient
  - Bind opacity to `--corruption-overlay-opacity` CSS variable
  - Set `pointer-events: none` to allow interaction with underlying UI
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 6.3 Create GlitchText component
  - Create `src/components/VisualEffects/GlitchText.tsx`
  - Implement font switching based on corruption level (Inter for <50, Creepster for >50)
  - Add glitch animation using CSS pseudo-elements with `data-text` attribute
  - Apply animation conditionally when corruption > 50
  - _Requirements: 1.1, 1.2, 1.3, 7.1, 7.2, 7.5_

- [x] 6.4 Create CSS corruption engine
  - Create `src/styles/corruption.css` with three state classes: `.sanctified` (smooth glassmorphism), `.possessed` (jittery), `.damned` (screen-tear)
  - Implement `@keyframes` for jitter, screen-tear, and heavenly-glow animations
  - Define CSS custom properties for blur, hue-rotation, saturation, brightness, overlay-opacity
  - Implement smooth transitions using CSS `transform` and `opacity` for 60fps performance
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 7. Implement Auditory Hallucinations (Audio System)
- [x] 7.1 Create useAudioCorruption hook
  - Create `src/hooks/useAudioCorruption.ts`
  - Initialize WebAudio API context, oscillator node, and gain node
  - Implement `initAudio()` function to resume AudioContext and start oscillator (browser safety requirement)
  - Implement frequency calculation function: Corruption >50 = Low frequency sawtooth wave (40-80 Hz, dissonant), Corruption ≤50 = High frequency sine wave (220-440 Hz, harmonic)
  - Implement waveform selection based on corruption level
  - Update oscillator frequency and type in `useEffect` when corruption level changes
  - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [x] 7.2 Implement interaction sound effects
  - Add `playInteractionSound()` function to useAudioCorruption hook
  - Generate distorted noise buffer for clicks/hovers when corruption > 50
  - Connect buffer source to audio context and play on interaction
  - _Requirements: 2.4_

- [x] 8. Create Seance Overlay (Audio Initialization Gate)
  - Create `src/components/SeanceOverlay.tsx` component
  - Implement full-screen blocking modal with "ENTER THE NIGHTMARE" button
  - On button click: call `audioCtx.resume()` via `initAudio()` from useAudioCorruption hook, hide overlay, start the audio drone
  - Hide overlay after button click using local state
  - Style with Creepster font, red border, pulse animation, and dark radial gradient background
  - _Requirements: 2.1, 7.1_

- [x] 9. Implement MCP Server (Corruption Sensor)
  - Create `src/mcp/corruption-server.ts` using `@modelcontextprotocol/sdk`
  - Initialize McpServer with name "CorruptionSensor" and version "1.0.0"
  - Implement tool `get_corruption_level` with logic to read `public/corruption-state.json` and return text summary for the AI
  - Format response with corruption level percentage, vulnerability count, and details (type and file for each vulnerability)
  - Add error handling for missing or invalid JSON file
  - Connect server to StdioServerTransport
  - _Requirements: 6.1, 6.2, 6.5_

- [x] 10. Configure MCP in Kiro
  - Create or update `.kiro/settings/mcp.json` with corruption-sensor server configuration
  - Set command to `npx ts-node src/mcp/corruption-server.ts` (uses ts-node for TypeScript execution)
  - Add `get_corruption_level` to autoApprove list
  - Test MCP tool by asking Kiro Chat "What is the current corruption level?" and verify it returns the correct data
  - _Requirements: 6.1, 6.4_

- [x] 11. Create Dashboard Component
  - Create `src/components/Dashboard.tsx` as main UI component
  - Use `useCorruption` hook to access corruption level and vulnerabilities
  - Display corruption bar showing 0-100% with visual progress indicator
  - Render the three vulnerable components side-by-side (LeakyComponent, InjectionComponent, UnsafeComponent)
  - Show "Sanctification Status" for each component based on detected vulnerabilities
  - Display instructions for using Kiro to fix vulnerabilities
  - Apply corruption state data attribute for CSS styling
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 12. Create Steering Document (The Exorcism Rules)
  - Create `.kiro/steering/owasp-guide.md` with The Exorcism Rules
  - Document Rule 1: "If you see a secret, use import.meta.env" (before/after with `import.meta.env.VITE_API_KEY`)
  - Document Rule 2: "Never use dangerouslySetInnerHTML" (before/after with DOMPurify or safe text rendering)
  - Document Rule 3: "If you see eval, delete it" (before/after with safe alternatives)
  - Include React/TypeScript code examples for each vulnerability type
  - This ensures Kiro fixes bugs correctly during the live demo
  - _Requirements: 6.1, 6.2_

- [x] 13. Wire up main App component
  - Update `src/App.tsx` with component hierarchy: `<SeanceOverlay />` → `<CorruptionProvider>` → `<Dashboard />`
  - Add CorruptionFilter and CorruptionOverlay components to visual layer
  - Apply corruption-based CSS classes to root container based on corruption level
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 14. Initialize corruption state file
  - Create initial `public/corruption-state.json` with corruption level 100
  - Include all three vulnerabilities in the vulnerabilities array (hardcoded-secret, prompt-injection, xss)
  - Add timestamp and lastScan fields with current ISO timestamp
  - _Requirements: 4.5, 8.3_

- [ ] 15. Create Exorcism Guide Panel
- [ ] 15.1 Create ExorcismGuide component
  - Create `src/components/ExorcismGuide.tsx` with fixed right-side positioning
  - Define GUIDE_STEPS array with 6 steps (Enter Nightmare, Identify Corruption, Fix Secrets, Fix Injection, Fix XSS, Achieve Sanctification)
  - Implement step status logic using `isComplete` and `isActive` functions based on corruption level and vulnerabilities
  - Accept `corruptionLevel` and `vulnerabilities` props from CorruptionContext
  - Render step list with visual indicators (✅ complete, ▶️ active, ⏸️ pending)
  - _Requirements: 9.1, 9.2, 9.5_

- [ ] 15.2 Style the guide panel
  - Create `src/components/ExorcismGuide.css` with fixed positioning at right edge
  - Set width to 320px with full viewport height
  - Apply semi-transparent dark background with backdrop blur
  - Style active steps with blue glow and border
  - Style completed steps with reduced opacity
  - Add smooth transitions for background and border colors
  - Implement custom scrollbar styling for overflow content
  - Apply corruption-based styling (sanctified = blue tint, damned = red tint)
  - _Requirements: 9.1, 9.3, 9.4_

- [ ] 15.3 Integrate guide panel into Dashboard
  - Import ExorcismGuide component in Dashboard.tsx
  - Pass corruptionLevel and vulnerabilities from useCorruption hook
  - Position guide panel alongside main dashboard content
  - Ensure guide remains visible at all corruption levels
  - _Requirements: 9.1, 9.3_

- [ ] 16. Test sanctification workflow end-to-end (The Loop)
  - Start with corruption level 100 (all vulnerabilities present)
  - Save LeakyComponent.tsx and verify `public/corruption-state.json` updates timestamp
  - Verify Dashboard UI updates with new corruption level (visuals change)
  - Verify audio pitch shifts based on new corruption level
  - Use Kiro to fix LeakyComponent by replacing hardcoded key with environment variable
  - Verify hook detects fix and updates JSON to ~67
  - Verify UI transitions to less corrupted state within 500ms
  - Verify audio transitions from sawtooth to sine wave
  - Repeat for InjectionComponent and UnsafeComponent
  - Verify final state reaches 0% corruption with pristine glassmorphism visuals
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x]* 17. Create demo preparation script (CRITICAL for resets)
  - Create `scripts/reset-demo.sh` bash script
  - Add command to reset code to vulnerable state: `git checkout src/components/vulnerable/`
  - Add command to reset state file: `echo '{"corruptionLevel": 100, "vulnerabilities": [...]}' > public/corruption-state.json`
  - Make script executable with `chmod +x`
  - _Requirements: Demo Support_

- [x]* 18. Document the project
  - Create `README.md` explaining the "Haunted Code" concept
  - Document setup instructions and dependencies
  - Document the 3-minute demo flow with timestamps (0:00 Enter Nightmare, 0:30 MCP test, 1:30 Fix code, 2:30 Sanctified)
  - Document MCP tool usage and Kiro integration points (hooks, steering, specs, MCP)
  - Include link to .kiro directory structure for judges
  - _Requirements: 6.3, 6.4_
