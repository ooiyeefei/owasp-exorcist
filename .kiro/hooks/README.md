# Kiro Agent Hooks - The Digital Exorcism

This directory contains Kiro Agent Hooks that automate various aspects of the security vulnerability detection and remediation workflow.

## Available Hooks

### 1. 🔮 The Ritual - Corruption Scanner
**File:** `measure-corruption.cjs`  
**Trigger:** `onFileSave` - `src/components/vulnerable/**/*.tsx`  
**Status:** ✅ Enabled

Scans vulnerable components for OWASP security vulnerabilities and updates the corruption state.

**What it does:**
- Detects hardcoded secrets (API keys)
- Detects prompt injection (`dangerouslySetInnerHTML`)
- Detects XSS vulnerabilities (`eval()`)
- Calculates corruption level (0-100%)
- Updates `public/corruption-state.json`

**Demo Value:** Core mechanic - drives the visual/audio corruption effects

---

### 2. 📝 The Sanctification Recorder
**File:** `auto-commit-fix.cjs`  
**Trigger:** `onFileSave` - `src/components/vulnerable/**/*.tsx`  
**Status:** ⏸️ Disabled (enable for auto-commit workflow)

Automatically commits security fixes with descriptive messages.

**What it does:**
- Detects when vulnerabilities are fixed
- Stages changes in vulnerable components
- Creates descriptive commit messages
- Auto-commits with corruption level info

**Demo Value:** Shows automated git workflow integration

**Enable:** Set `"enabled": true` in `hooks.json`

---

### 3. 🎉 The Victory Chime
**File:** `celebration-toast.cjs`  
**Trigger:** `onFileSave` - `public/corruption-state.json`  
**Status:** ✅ Enabled

Shows celebration when corruption reaches 0% (full sanctification).

**What it does:**
- Monitors corruption level changes
- Displays ASCII art celebration at 0%
- Shows progress messages at milestones
- Plays system sound (macOS) on victory

**Demo Value:** Provides satisfying feedback for completing the exorcism

---

### 4. 📚 The Grimoire Scribe
**File:** `security-docs.cjs`  
**Trigger:** `onFileSave` - `src/components/vulnerable/**/*.tsx`  
**Status:** ⏸️ Disabled (enable for auto-documentation)

Auto-generates security fix documentation.

**What it does:**
- Tracks which vulnerabilities have been fixed
- Generates `SECURITY_FIXES.md` with details
- Documents OWASP categories and impact
- Maintains fix history with timestamps

**Demo Value:** Shows automated documentation generation

**Enable:** Set `"enabled": true` in `hooks.json`

---

## Hook Configuration

Edit `hooks.json` to enable/disable hooks or modify triggers:

```json
{
  "hooks": [
    {
      "id": "measure-corruption",
      "enabled": true,  // Set to false to disable
      "trigger": {
        "type": "onFileSave",
        "filePattern": "src/components/vulnerable/**/*.tsx"
      }
    }
  ]
}
```

## Testing Hooks Manually

You can test any hook manually:

```bash
# Test The Ritual
node .kiro/hooks/measure-corruption.cjs

# Test Celebration
node .kiro/hooks/celebration-toast.cjs

# Test Documentation Generator
node .kiro/hooks/security-docs.cjs

# Test Auto-Commit (requires git changes)
node .kiro/hooks/auto-commit-fix.cjs
```

## Demo Workflow

### Recommended Setup for Hackathon Demo:

1. **Always Enabled:**
   - ✅ The Ritual (corruption scanner)
   - ✅ The Victory Chime (celebration)

2. **Optional (based on demo style):**
   - ⏸️ The Sanctification Recorder (if you want auto-commits)
   - ⏸️ The Grimoire Scribe (if you want auto-docs)

### Demo Script:

1. Start with all vulnerabilities (corruption: 100%)
2. Fix a vulnerability with Kiro
3. Save file → The Ritual runs → Corruption drops
4. UI heals in real-time
5. Repeat until 0% → Victory Chime plays!

## Kiro Integration Points

These hooks demonstrate:
- ✅ **Agent Hooks** - Automated workflows on file events
- ✅ **Steering Docs** - `.kiro/steering/owasp-guide.md` guides fixes
- ✅ **MCP Integration** - Corruption sensor MCP server
- ✅ **Spec-Driven Dev** - `.kiro/specs/` directory structure

## Troubleshooting

### Hook Not Triggering
- Check `hooks.json` has `"enabled": true`
- Verify file pattern matches saved file
- Check Kiro IDE hook settings

### Permission Errors
```bash
chmod +x .kiro/hooks/*.cjs
```

### Git Errors (Auto-Commit Hook)
- Ensure git is configured: `git config user.name` and `git config user.email`
- Commit initial vulnerable files first
- Disable auto-commit hook if not using git

## For Judges

This hooks system showcases:
1. **Automation** - Real-time code analysis without manual intervention
2. **Integration** - Git, documentation, and celebration workflows
3. **Extensibility** - Easy to add new hooks for different triggers
4. **Professional Workflow** - Mirrors real-world CI/CD practices
