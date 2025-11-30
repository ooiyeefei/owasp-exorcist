/**
 * Dynamic Corruption Measurement - For Generated Components
 * Preserves session data and component metadata
 */

const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.join(process.cwd(), 'src', 'components', 'vulnerable', 'generated');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'corruption-state.json');

function checkVulnerabilityFixed(filePath, detection) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove comments to avoid false positives
    const codeOnly = content
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*/g, ''); // Remove line comments
    
    // Check based on detection type
    let hasVulnerablePattern = false;
    
    switch(detection.type) {
      case 'regex':
        hasVulnerablePattern = new RegExp(detection.pattern).test(codeOnly);
        break;
      
      case 'string':
        hasVulnerablePattern = codeOnly.includes(detection.pattern);
        break;
      
      case 'comment':
        // For comment type, check if the vulnerable comment is still there
        hasVulnerablePattern = content.includes(detection.pattern); // Check full content including comments
        break;
      
      default:
        hasVulnerablePattern = codeOnly.includes(detection.pattern);
    }
    
    // Check if any fix indicators are present
    const hasFixIndicators = detection.fixIndicators && detection.fixIndicators.some(indicator => 
      codeOnly.includes(indicator)
    );
    
    // For 'comment' type: fixed if comment is removed OR fix indicators are present
    // For other types: fixed if vulnerable pattern is gone
    if (detection.type === 'comment') {
      return !hasVulnerablePattern || hasFixIndicators;
    } else {
      return !hasVulnerablePattern;
    }
    
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  // Read existing state
  if (!fs.existsSync(OUTPUT_FILE)) {
    console.log('No corruption state found. Run start-game-dynamic.cjs first!');
    return;
  }
  
  let state;
  try {
    const stateContent = fs.readFileSync(OUTPUT_FILE, 'utf-8');
    state = JSON.parse(stateContent);
  } catch (error) {
    console.error('Error reading corruption state:', error.message);
    return;
  }
  
  // Check if this is a dynamic session
  if (!state.generatedComponents || state.generatedComponents.length === 0) {
    console.log('Not a dynamic session. Using legacy measure-corruption.cjs');
    return;
  }
  
  console.log(`Checking ${state.vulnerabilities.length} vulnerabilities...`);
  
  // Get the original total from session start (stored in generatedComponents)
  const originalTotal = state.totalVulnerabilities || state.generatedComponents.length;
  
  console.log(`Checking ${state.vulnerabilities.length} vulnerabilities...`);
  
  // Check each vulnerability
  const stillVulnerable = [];
  for (const vuln of state.vulnerabilities) {
    // Handle both "generated/File.tsx" and "File.tsx" formats
    const fileName = vuln.file.replace('generated/', '');
    const filePath = path.join(GENERATED_DIR, fileName);
    
    // Use detection pattern from vulnerability data
    const detection = vuln.detection || {
      type: 'string',
      pattern: vuln.pattern,
      fixIndicators: []
    };
    
    const isFixed = checkVulnerabilityFixed(filePath, detection);
    
    if (!isFixed) {
      stillVulnerable.push(vuln);
      console.log(`  ❌ ${vuln.componentName} - Still vulnerable`);
    } else {
      console.log(`  ✅ ${vuln.componentName} - FIXED!`);
    }
  }
  
  // Calculate new corruption level based on ORIGINAL total, not current remaining
  const fixedCount = originalTotal - stillVulnerable.length;
  const corruptionLevel = Math.round((stillVulnerable.length / originalTotal) * 100);
  
  // Update state
  state.corruptionLevel = corruptionLevel;
  state.vulnerabilities = stillVulnerable;
  state.totalVulnerabilities = originalTotal; // Preserve original total
  state.timestamp = Date.now();
  state.lastScan = new Date().toISOString();
  
  // Write updated state
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(state, null, 2));
  
  console.log(`\nCorruption level: ${corruptionLevel}%`);
  console.log(`Fixed: ${fixedCount}/${originalTotal}`);
  console.log(`Remaining: ${stillVulnerable.length}`);
}

main();
