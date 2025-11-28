#!/usr/bin/env node

/**
 * The Sanctification Recorder
 * Auto-commits security fixes with descriptive messages
 * Triggered on file save in vulnerable components
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read corruption state to determine what was fixed
const stateFile = path.join(process.cwd(), 'public/corruption-state.json');

try {
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  const { corruptionLevel, vulnerabilities } = state;

  // Check if there are changes to commit
  const status = execSync('git status --porcelain src/components/vulnerable/', { encoding: 'utf-8' });
  
  if (!status.trim()) {
    console.log('✨ No changes to commit');
    process.exit(0);
  }

  // Determine what was fixed based on remaining vulnerabilities
  const fixedTypes = [];
  const vulnTypes = vulnerabilities.map(v => v.type);
  
  if (!vulnTypes.includes('hardcoded-secret')) {
    fixedTypes.push('🔑 Hardcoded Secret');
  }
  if (!vulnTypes.includes('prompt-injection')) {
    fixedTypes.push('💉 Prompt Injection');
  }
  if (!vulnTypes.includes('xss')) {
    fixedTypes.push('⚡ XSS Vulnerability');
  }

  if (fixedTypes.length === 0) {
    console.log('✨ No vulnerabilities fixed yet');
    process.exit(0);
  }

  // Create commit message
  const commitMsg = `🔮 Sanctification: Fixed ${fixedTypes.join(', ')}

Corruption Level: ${corruptionLevel}%
Remaining Vulnerabilities: ${vulnerabilities.length}

Auto-committed by The Sanctification Recorder`;

  // Stage and commit
  execSync('git add src/components/vulnerable/', { stdio: 'inherit' });
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

  console.log('✅ Security fix committed!');
  console.log(`📝 Fixed: ${fixedTypes.join(', ')}`);

} catch (error) {
  // Silently fail if git is not configured or no changes
  console.log('⚠️  Auto-commit skipped:', error.message);
}
