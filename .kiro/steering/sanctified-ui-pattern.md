---
inclusion: always
---

# Sanctified UI Pattern - Dynamic Vulnerability Display

## Overview

When corruption level reaches 0% (sanctified state), the UI automatically transforms to a light, celebratory theme. Generated vulnerable components remain unchanged in their code - the visual transformation happens purely through CSS.

## Key Principle: Simplicity

**DO NOT** modify generated component code to show "FIXED" status dynamically. Keep components simple and static. The CSS handles all visual feedback.

## How It Works

### 1. Components Stay Static
Generated vulnerable components always show:
- Original vulnerability name (e.g., "Hardcoded API Key")
- Warning severity (e.g., "⚠️ HIGH severity - A02:2021")
- Yellow hint boxes with vulnerability hints

**Never add conditional logic like:**
```typescript
// ❌ DON'T DO THIS
{isFixed ? 'FIXED ✅' : 'Vulnerable'}
```

### 2. CSS Provides Visual Feedback

When `corruptionLevel === 0`, the `.app-container.sanctified` class is applied, which:

**Adds a "✅ FIXED" badge** via CSS:
```css
.app-container.sanctified .vulnerable-component::after {
  content: '✅ FIXED';
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  /* ... */
}
```

**Transforms the entire UI:**
- Light gradient background
- White cards with dark text
- Clean Inter font (no horror fonts)
- Professional, readable design

### 3. Benefits of This Approach

✅ **Simple**: Components don't need props or state management
✅ **Reusable**: Same component works for all corruption states  
✅ **Dynamic**: Works automatically when corruption changes
✅ **Clean**: No complex conditional rendering logic

## For Future Development

When generating new vulnerable components:

1. **Keep them simple** - Just show the vulnerability as-is
2. **No dynamic status** - Don't add `isFixed` props or conditional rendering
3. **Trust the CSS** - The sanctified state styling handles everything
4. **Follow templates** - Use existing templates in `.kiro/templates/vulnerabilities/`

## CSS Classes to Remember

- `.app-container.sanctified` - Applied when corruption is 0%
- `.vulnerable-component` - Base class for all vulnerability cards
- The `::after` pseudo-element adds the "FIXED" badge automatically

## Example: Correct Component Structure

```typescript
export function VulnerableHardcodedAPIKey() {
  // ... component logic ...
  
  return (
    <div className="vulnerable-component hardcoded-secret">
      <h3>Hardcoded API Key</h3>
      <p className="warning">⚠️ HIGH severity - A02:2021</p>
      
      <div style={{ /* yellow hint box */ }}>
        <p>💡 <strong>Hint:</strong> Look for API_KEY variables</p>
      </div>
      
      {/* ... rest of component ... */}
    </div>
  );
}
```

That's it! No `isFixed` prop, no conditional rendering. The CSS does the rest.

## Alignment

Components use CSS Grid with `align-items: stretch` to ensure all cards have the same height regardless of content length. This is handled in `Dashboard.css`:

```css
.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  align-items: stretch;
}
```

## Summary

**Keep it simple.** Generated components show vulnerabilities. CSS shows when they're fixed. No complex logic needed.
