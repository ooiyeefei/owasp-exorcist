#!/usr/bin/env node

/**
 * The Victory Chime
 * Shows celebration when corruption reaches 0%
 * Triggered when corruption-state.json is updated
 */

const fs = require('fs');
const path = require('path');

const stateFile = path.join(process.cwd(), 'public/corruption-state.json');

try {
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  const { corruptionLevel, vulnerabilities } = state;

  // Check if fully sanctified
  if (corruptionLevel === 0 && vulnerabilities.length === 0) {
    console.log('\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('                  🎉 SANCTIFICATION COMPLETE! 🎉        ');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('  ✨ All demons have been exorcised from your codebase!');
    console.log('  😇 Your code now shines with the light of security!');
    console.log('  🔒 OWASP vulnerabilities: 0');
    console.log('  💎 Corruption Level: 0%');
    console.log('');
    console.log('  The Digital Exorcism is complete. Well done, Exorcist!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n');

    // Optional: Play a system sound (macOS)
    try {
      require('child_process').execSync('afplay /System/Library/Sounds/Glass.aiff', { 
        stdio: 'ignore',
        timeout: 1000 
      });
    } catch (e) {
      // Silently fail if sound doesn't work
    }
  } else if (corruptionLevel < 50 && corruptionLevel > 0) {
    console.log(`\n✨ Progress! Corruption reduced to ${corruptionLevel}%. Keep going!\n`);
  }

} catch (error) {
  // Silently fail if state file doesn't exist yet
  console.log('⚠️  Celebration check skipped:', error.message);
}
