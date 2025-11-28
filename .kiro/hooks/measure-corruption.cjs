/**
 * The Ritual - Agent Hook for measuring code corruption
 * Scans vulnerable components for OWASP security vulnerabilities
 * and calculates a corruption score (0-100)
 */

const fs = require('fs');
const path = require('path');

// Vulnerability patterns with weights
const PATTERNS = {
  promptInjection: {
    regex: /dangerouslySetInnerHTML/gi,
    weight: 33,
    type: 'prompt-injection',
    description: 'Unsafe HTML rendering detected (dangerouslySetInnerHTML)'
  },
  hardcodedSecret: {
    regex: /sk-[a-zA-Z0-9]{20,}/gi,
    weight: 33,
    type: 'hardcoded-secret',
    description: 'Hardcoded API key or secret detected'
  },
  xss: {
    regex: /eval\s*\(/gi,
    weight: 34,
    type: 'xss',
    description: 'XSS vulnerability pattern detected (eval)'
  }
};

// Directory to scan
const VULNERABLE_DIR = path.join(process.cwd(), 'src', 'components', 'vulnerable');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'corruption-state.json');

function scanFile(filePath) {
  const vulnerabilities = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    // Remove comments to avoid false positives
    const codeOnly = content
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*/g, ''); // Remove line comments
    
    for (const [key, pattern] of Object.entries(PATTERNS)) {
      const matches = codeOnly.match(pattern.regex);
      if (matches && matches.length > 0) {
        vulnerabilities.push({
          type: pattern.type,
          file: fileName,
          pattern: pattern.regex.toString(),
          description: pattern.description,
          severity: 'high',
          count: matches.length
        });
      }
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
  
  return vulnerabilities;
}

function calculateCorruption(vulnerabilities) {
  const uniqueTypes = new Set(vulnerabilities.map(v => v.type));
  let score = 0;
  
  for (const type of uniqueTypes) {
    const pattern = Object.values(PATTERNS).find(p => p.type === type);
    if (pattern) {
      score += pattern.weight;
    }
  }
  
  return Math.min(score, 100);
}

function main() {
  const allVulnerabilities = [];
  
  // Check if vulnerable directory exists
  if (!fs.existsSync(VULNERABLE_DIR)) {
    console.log('Vulnerable directory does not exist yet. Creating initial state.');
    writeState(100, []);
    return;
  }
  
  // Scan all .tsx files in vulnerable directory
  try {
    const files = fs.readdirSync(VULNERABLE_DIR);
    const tsxFiles = files.filter(f => f.endsWith('.tsx'));
    
    for (const file of tsxFiles) {
      const filePath = path.join(VULNERABLE_DIR, file);
      const vulnerabilities = scanFile(filePath);
      allVulnerabilities.push(...vulnerabilities);
    }
  } catch (error) {
    console.error('Error scanning directory:', error.message);
  }
  
  const corruptionLevel = calculateCorruption(allVulnerabilities);
  writeState(corruptionLevel, allVulnerabilities);
}

function writeState(corruptionLevel, vulnerabilities) {
  const state = {
    corruptionLevel,
    vulnerabilities,
    timestamp: Date.now(),
    lastScan: new Date().toISOString(),
    scanDuration: 0
  };
  
  try {
    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(state, null, 2));
    console.log(`Corruption level: ${corruptionLevel}%`);
    console.log(`Vulnerabilities found: ${vulnerabilities.length}`);
  } catch (error) {
    console.error('Error writing state file:', error.message);
  }
}

// Run the ritual
main();
