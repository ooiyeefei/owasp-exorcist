# Requirements Document: Detection Pattern Improvements

## Introduction

The current dynamic vulnerability generation system has a critical flaw: detection patterns are too broad and match non-vulnerable code (function names, comments, educational text). This creates a poor user experience where vulnerabilities appear "unfixed" even after proper remediation.

## Glossary

- **Detection Pattern**: A regex or string pattern used to identify if a vulnerability still exists in code
- **Fix Indicator**: A string or pattern that indicates a vulnerability has been properly fixed
- **False Positive**: When the detection system incorrectly identifies fixed code as still vulnerable
- **Component Name**: The React function/component name (e.g., `VulnerableXSS`)
- **Vulnerable Code**: The actual security flaw in executable code (not comments or text)

## Requirements

### Requirement 1: Precise Detection Patterns

**User Story:** As a player, I want the game to accurately detect when I've fixed a vulnerability, so that I get immediate positive feedback without confusion.

#### Acceptance Criteria

1. WHEN a detection pattern is created THEN the system SHALL use regex patterns that match only executable vulnerable code, not comments or text
2. WHEN checking for XSS vulnerabilities THEN the system SHALL match the JSX pattern `dangerouslySetInnerHTML=\{\{` not just the string "dangerouslySetInnerHTML"
3. WHEN checking for hardcoded secrets THEN the system SHALL match the actual secret value pattern (e.g., `sk-[a-z0-9]{40}`) not variable names
4. WHEN checking for eval vulnerabilities THEN the system SHALL match `eval\s*\(` with proper regex escaping
5. WHEN a vulnerability is properly fixed THEN the detection system SHALL immediately recognize it as fixed

### Requirement 2: Clean Component Naming

**User Story:** As a developer, I want generated components to have clean, simple names that don't interfere with detection, so that the system is maintainable.

#### Acceptance Criteria

1. WHEN generating a component THEN the system SHALL use generic names like `VulnerableComponent1`, `VulnerableComponent2`
2. WHEN displaying the UI THEN the system SHALL show the vulnerability type in the title (e.g., "XSS via Unsafe HTML")
3. WHEN exporting components THEN the system SHALL use the generic component name, not the vulnerability type name
4. WHEN creating HTML IDs THEN the system SHALL use generic IDs like `vuln-1-input` not `VulnerableXSS-input`
5. WHEN detection runs THEN the system SHALL not match against component names or IDs

### Requirement 3: Minimal Comments in Generated Code

**User Story:** As a player, I want generated code to be clean and focused, so that I can quickly identify the actual vulnerability.

#### Acceptance Criteria

1. WHEN generating vulnerable code THEN the system SHALL include only essential comments
2. WHEN adding TODO hints THEN the system SHALL use generic language that doesn't repeat vulnerability keywords
3. WHEN documenting fixes THEN the system SHALL use comments that don't interfere with detection
4. WHEN a file header is needed THEN the system SHALL use minimal metadata
5. WHEN educational content is displayed THEN the system SHALL place it in JSX/UI, not in code comments

### Requirement 4: Robust Detection Logic

**User Story:** As a player, I want the detection system to be smart about what constitutes a fix, so that I don't have to work around detection limitations.

#### Acceptance Criteria

1. WHEN checking if code is fixed THEN the system SHALL remove all comments before pattern matching
2. WHEN a fix indicator is present THEN the system SHALL recognize the vulnerability as fixed even if the pattern string exists elsewhere
3. WHEN multiple fix approaches exist THEN the system SHALL accept any valid fix indicator
4. WHEN detection runs THEN the system SHALL log clear debug information about what it found
5. WHEN a false positive occurs THEN the system SHALL provide helpful error messages

### Requirement 5: Template Consistency

**User Story:** As a maintainer, I want all vulnerability templates to follow consistent patterns, so that detection works reliably across all vulnerability types.

#### Acceptance Criteria

1. WHEN creating a template THEN the system SHALL define precise regex patterns for detection
2. WHEN defining fix indicators THEN the system SHALL list all valid fix approaches
3. WHEN templates are loaded THEN the system SHALL validate that patterns are properly escaped
4. WHEN generating code THEN the system SHALL use the template's detection pattern consistently
5. WHEN updating templates THEN the system SHALL test detection against sample fixed/unfixed code

## Example Improvements

### Current (Problematic):
```javascript
// Detection pattern
pattern: 'dangerouslySetInnerHTML'

// Matches:
- function VulnerableXSSviadangerouslySetInnerHTML() ❌
- <h3>XSS via dangerouslySetInnerHTML</h3> ❌  
- id="VulnerableXSS-dangerouslySetInnerHTML-input" ❌
- <div dangerouslySetInnerHTML={{__html: x}} /> ✅ (actual vulnerability)
```

### Improved:
```javascript
// Detection pattern  
pattern: 'dangerouslySetInnerHTML\\s*=\\s*\\{\\{'

// Matches:
- function VulnerableComponent1() ✅ (no match - good!)
- <h3>XSS Vulnerability</h3> ✅ (no match - good!)
- id="vuln-1-input" ✅ (no match - good!)
- <div dangerouslySetInnerHTML={{__html: x}} /> ✅ (actual vulnerability - matches!)
```

## Success Metrics

1. **Zero False Positives**: Fixed vulnerabilities are immediately recognized as fixed
2. **Clear Feedback**: Players see corruption drop within 1 second of fixing code
3. **No Workarounds**: Players never need to modify detection scripts or use hacky fixes
4. **Consistent Behavior**: All 8 vulnerability types work reliably
5. **Maintainable**: New vulnerability types can be added without detection issues
