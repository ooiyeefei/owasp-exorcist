# Requirements Document

## Introduction

"The Digital Exorcism" is a meta-application that haunts itself based on the quality of its own source code. Designed to win the Kiroween Hackathon, it demonstrates the synergy between Kiro Agent Hooks (for code analysis), Steering Specs (for automated remediation), and high-fidelity UI/UX (for the Costume Contest). The system visually and audibly degrades when insecure coding patterns are detected in the codebase and sanctifies (heals) itself in real-time as the user utilizes Kiro to refactor the code according to OWASP standards.

## Glossary

- **The Haunted Codebase**: The specific directory of React components (/src/components/vulnerable/*) that the system monitors for security flaws
- **The Ritual (Agent Hook)**: A Kiro/Node.js script that runs on file save/commit to scan the codebase for regex patterns of vulnerability
- **Corruption Engine**: The frontend state machine receiving signals from The Ritual to drive visual and audio decay
- **Corruption Level**: A numeric value (0-100) representing the current state of visual and audio corruption, calculated by The Ritual based on detected vulnerabilities
- **Sanctification**: The process of using Kiro AI to refactor code, effectively lowering the corruption score
- **Steering Grimoire**: The .kiro/steering/*.md files that teach the AI how to fix specific vulnerabilities
- **Visual Effect Layer**: The rendering system that applies corruption-based styling to UI components using CSS custom properties
- **Auditory Hallucinations**: WebAudio API-driven soundscape that reflects system health
- **Corruption State File**: A JSON file (public/corruption-state.json) written by The Ritual and polled by the frontend

## Requirements

### Requirement 1: The Corruption Engine (Visual Decay)

**User Story:** As a user, I want the interface to physically degrade based on a dynamic corruption level, so that I feel the visceral impact of insecure code.

#### Acceptance Criteria

1. WHEN the corruption level is between 0 and 20, THE Visual Effect Layer SHALL apply sanctified styling including glassmorphism, white and blue gradients, 60fps animations, and heavenly particle effects.
2. WHEN the corruption level is between 21 and 70, THE Visual Effect Layer SHALL apply possessed styling including CSS jitter, chromatic aberration, flickering text, and occasional subliminal frame injections.
3. WHEN the corruption level is between 71 and 100, THE Visual Effect Layer SHALL apply damned styling including screen tearing via SVG filters, blood-red overlay, unreadable Zalgo-style text, and inverted colors.
4. THE Corruption Engine SHALL inject CSS custom properties into the document root element based on the current corruption level.
5. THE Visual Effect Layer SHALL use CSS transform and opacity properties for all transitions to maintain 60 frames per second performance despite heavy SVG filter usage.

### Requirement 2: The Auditory Hallucinations (Audio Decay)

**User Story:** As a user, I want the soundscape to reflect the system's health, so that I experience an unsettling atmosphere that resolves into harmony upon fixing vulnerabilities.

#### Acceptance Criteria

1. THE Auditory Hallucinations SHALL play a continuous background drone using the WebAudio API oscillator.
2. WHEN the corruption level is greater than 50, THE Auditory Hallucinations SHALL generate a low-frequency sawtooth wave producing an unsettling and dissonant sound.
3. WHEN the corruption level is less than or equal to 50, THE Auditory Hallucinations SHALL generate a sine wave major chord pad producing an angelic and harmonious sound.
4. WHEN the corruption level is greater than 50, THE Auditory Hallucinations SHALL trigger distorted sound effects on user interactions including clicks and hovers.
5. THE Auditory Hallucinations SHALL smoothly transition between sound states within 1000 milliseconds when the corruption level changes.

### Requirement 3: Automated Code Analysis (The Ritual Hook)

**User Story:** As a developer, I want the system to automatically detect vulnerabilities in my source code without manual input, so that the dashboard demonstrates Kiro's Agent Hooks capability.

#### Acceptance Criteria

1. THE Ritual SHALL be implemented as a custom script at .kiro/hooks/measure-corruption.js that executes whenever a file in /src/components/vulnerable/ is saved.
2. WHEN The Ritual executes, THE Ritual SHALL scan source code for the regex pattern dangerouslySetInnerHTML or unescaped user inputs to detect prompt injection vulnerabilities.
3. WHEN The Ritual executes, THE Ritual SHALL scan source code for the regex pattern sk-[a-zA-Z0-9]{20,} to detect hardcoded API keys indicating data leak vulnerabilities.
4. WHEN The Ritual executes, THE Ritual SHALL scan source code for the regex patterns eval\( or direct DOM manipulation methods to detect XSS vulnerabilities.
5. WHEN The Ritual completes analysis, THE Ritual SHALL write the calculated corruption score to the Corruption State File at public/corruption-state.json.

### Requirement 4: The Haunted Codebase (Vulnerable Components)

**User Story:** As a hackathon participant, I want the repository to ship with intentionally vulnerable components, so that I can demonstrate the sanctification workflow using Kiro.

#### Acceptance Criteria

1. THE Haunted Codebase SHALL include a component named LeakyComponent.tsx that contains hardcoded secrets matching the pattern sk-[a-zA-Z0-9]{20,}.
2. THE Haunted Codebase SHALL include a component named InjectionComponent.tsx that uses dangerouslySetInnerHTML to render raw HTML.
3. THE Haunted Codebase SHALL include a component named UnsafeComponent.tsx that contains eval() function calls or direct DOM manipulation creating XSS vulnerabilities.
4. THE Haunted Codebase SHALL be located in the directory /src/components/vulnerable/ for monitoring by The Ritual.
5. WHEN all three vulnerable components are present with unfixed vulnerabilities, THE Corruption Engine SHALL calculate a corruption level of 100.

### Requirement 5: The Sanctification Workflow (Real-Time Healing)

**User Story:** As a participant, I want to use Kiro to fix the code and see the UI heal in real-time, so that I receive immediate visual and audio feedback as a reward.

#### Acceptance Criteria

1. WHEN a user highlights vulnerable code in the Kiro IDE and prompts Kiro to fix the vulnerability, THE Corruption Engine SHALL detect the file save event within 1000 milliseconds.
2. WHEN The Ritual detects that a vulnerability pattern has been removed from the source code, THE Corruption Engine SHALL decrease the corruption level proportionally based on the severity of the fixed vulnerability.
3. WHEN the corruption level decreases, THE Visual Effect Layer SHALL transition from a more corrupted state to a less corrupted state within 500 milliseconds.
4. WHEN the corruption level decreases, THE Auditory Hallucinations SHALL transition from dissonant to harmonious tones within 1000 milliseconds.
5. THE Corruption Engine SHALL poll the Corruption State File every 1000 milliseconds to synchronize the frontend state with The Ritual's analysis results.

### Requirement 6: Kiro Integration (Judging Criteria)

**User Story:** As a hackathon judge, I want to clearly see how Kiro's features were used to build and operate the app, so that I can evaluate the depth of tool integration.

#### Acceptance Criteria

1. THE Steering Grimoire SHALL include a file at .kiro/steering/owasp-guide.md containing The Exorcism Rules with specific guidance such as "Always replace hardcoded keys with process.env".
2. THE Steering Grimoire SHALL provide before and after code examples for each of the three vulnerability types (prompt injection, data leaks, XSS).
3. THE project repository SHALL contain a .kiro/specs/ directory with visible spec files demonstrating that the initial boilerplate was generated via Kiro Spec-driven development.
4. THE project repository root SHALL contain the .kiro directory with visible usage of hooks, steering documents, and specs.
5. THE Steering Grimoire SHALL be automatically included in Kiro's context when the user requests vulnerability fixes in The Haunted Codebase.

### Requirement 7: The Costume Polish (Visual Design Excellence)

**User Story:** As a user, I want the haunted state to look professionally designed, so that the corruption effects appear intentional rather than broken.

#### Acceptance Criteria

1. WHEN the corruption level is between 0 and 20, THE Visual Effect Layer SHALL use the Inter font family for clean typography.
2. WHEN the corruption level is between 71 and 100, THE Visual Effect Layer SHALL use the Creepster or Rubik Glitch font family for haunted typography.
3. THE Visual Effect Layer SHALL apply a custom WebGL or SVG Turbulence filter to the main container element.
4. THE Visual Effect Layer SHALL drive the SVG filter baseFrequency attribute proportionally to the corruption level value.
5. THE Visual Effect Layer SHALL implement smooth font transitions using CSS font-family interpolation or cross-fade techniques.

### Requirement 8: State Synchronization (Frontend-Backend Communication)

**User Story:** As a developer, I want the frontend to automatically reflect code changes detected by The Ritual, so that the healing effect appears seamless and real-time.

#### Acceptance Criteria

1. THE Corruption Engine SHALL poll the Corruption State File at public/corruption-state.json every 1000 milliseconds.
2. WHEN the Corruption State File is updated by The Ritual, THE Corruption Engine SHALL parse the JSON content and extract the corruption level value within 100 milliseconds.
3. THE Corruption State File SHALL contain a JSON object with at minimum a corruptionLevel numeric property and a vulnerabilities array listing detected issues.
4. WHEN The Ritual cannot access or analyze files, THE Corruption Engine SHALL maintain the last known corruption level and display a connection status indicator.
5. THE Corruption Engine SHALL implement exponential backoff for polling if the Corruption State File is not found, retrying at 1000ms, 2000ms, 4000ms intervals.

### Requirement 9: Exorcism Guide Panel (Right-Side Instructions)

**User Story:** As a user, I want clear step-by-step instructions anchored at the right side of the UI, so that I understand how to perform the digital exorcism and fix vulnerabilities.

#### Acceptance Criteria

1. THE Visual Effect Layer SHALL display a fixed-position guide panel anchored to the right edge of the viewport.
2. THE guide panel SHALL contain numbered step-by-step instructions for performing the exorcism including opening vulnerable files, using Kiro to fix issues, and observing the healing effects.
3. THE guide panel SHALL remain visible and accessible at all times during the application session.
4. THE guide panel SHALL use clear typography with sufficient contrast against the background regardless of corruption level.
5. THE guide panel SHALL include visual indicators showing which step the user is currently on based on the corruption level and detected vulnerabilities.
