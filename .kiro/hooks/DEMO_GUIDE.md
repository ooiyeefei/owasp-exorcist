# Kiro Hooks Demo Guide

## Quick Reference for Hackathon Demo

### What Hooks Do We Have?

1. **🔮 The Ritual** (Always On)
   - Scans code for vulnerabilities
   - Updates corruption level
   - **Demo Impact:** Core mechanic - drives everything

2. **🎉 Victory Chime** (Always On)
   - Celebrates when you reach 0%
   - Shows progress messages
   - **Demo Impact:** Satisfying feedback

3. **📝 Sanctification Recorder** (Optional)
   - Auto-commits fixes
   - **Demo Impact:** Shows git automation

4. **📚 Grimoire Scribe** (Optional)
   - Generates security docs
   - **Demo Impact:** Shows documentation automation

### Recommended Demo Setup

**For 3-Minute Demo:**
- ✅ Enable: The Ritual + Victory Chime
- ⏸️ Disable: Auto-commit + Docs (to keep demo focused)

**For Extended Demo:**
- ✅ Enable all hooks
- Show automated git commits
- Show generated `SECURITY_FIXES.md`

### How to Enable/Disable Hooks

Edit `.kiro/hooks/hooks.json`:

```json
{
  "id": "auto-commit-fix",
  "enabled": false  // Change to true to enable
}
```

### Testing Hooks Before Demo

```bash
# Test The Ritual (should show 100% corruption)
node .kiro/hooks/measure-corruption.cjs

# Test Victory Chime (should be silent at 100%)
node .kiro/hooks/celebration-toast.cjs

# Test Docs Generator
node .kiro/hooks/security-docs.cjs
```

### Demo Script with Hooks

**0:00 - Setup**
- Show `.kiro/hooks/` directory
- Mention: "4 automated hooks running"

**0:30 - First Fix**
- Fix LeakyComponent
- Save → The Ritual runs automatically
- Corruption drops to ~67%

**1:30 - Second Fix**
- Fix InjectionComponent
- Save → The Ritual runs again
- Corruption drops to ~34%

**2:00 - Final Fix**
- Fix UnsafeComponent
- Save → The Ritual runs
- Corruption hits 0%
- **Victory Chime plays!** 🎉

**2:30 - Show Results**
- Point out the celebration message in terminal
- If auto-commit enabled: Show git log
- If docs enabled: Show `SECURITY_FIXES.md`

### Troubleshooting

**Hook not running?**
```bash
# Check hooks.json
cat .kiro/hooks/hooks.json

# Make scripts executable
chmod +x .kiro/hooks/*.cjs

# Test manually
node .kiro/hooks/measure-corruption.cjs
```

**No celebration?**
- Celebration only triggers at 0% corruption
- Check `public/corruption-state.json` shows 0

**Git errors with auto-commit?**
- Ensure git is configured
- Disable auto-commit hook if not using git

### Talking Points for Judges

"We have **4 Kiro Agent Hooks** that automate the workflow:

1. **The Ritual** scans code on every save - no manual scanning needed
2. **Victory Chime** provides instant feedback when you succeed
3. **Auto-commit** (optional) creates git commits automatically
4. **Docs Generator** (optional) maintains security documentation

This shows how Kiro hooks can automate repetitive tasks and create a seamless development experience."

### Advanced: Creating Your Own Hook

```javascript
// .kiro/hooks/my-hook.cjs
const fs = require('fs');

// Your hook logic here
console.log('Hook executed!');
```

Add to `hooks.json`:
```json
{
  "id": "my-hook",
  "name": "My Custom Hook",
  "trigger": {
    "type": "onFileSave",
    "filePattern": "**/*.tsx"
  },
  "action": {
    "type": "script",
    "command": "node .kiro/hooks/my-hook.cjs"
  },
  "enabled": true
}
```
