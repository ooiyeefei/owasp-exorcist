#!/usr/bin/env node

/**
 * The Grimoire Scribe
 * Auto-generates security fix documentation
 * Triggered on file save in vulnerable components
 */

const fs = require('fs');
const path = require('path');

const stateFile = path.join(process.cwd(), 'public/corruption-state.json');
const docsFile = path.join(process.cwd(), 'SECURITY_FIXES.md');

try {
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  const { corruptionLevel, vulnerabilities } = state;

  // Determine what has been fixed
  const allVulnTypes = ['hardcoded-secret', 'prompt-injection', 'xss'];
  const remainingTypes = vulnerabilities.map(v => v.type);
  const fixedTypes = allVulnTypes.filter(t => !remainingTypes.includes(t));

  if (fixedTypes.length === 0) {
    console.log('📝 No fixes to document yet');
    process.exit(0);
  }

  // Generate documentation
  const timestamp = new Date().toISOString();
  let docs = `# Security Fixes Log\n\n`;
  docs += `**Last Updated:** ${timestamp}\n`;
  docs += `**Corruption Level:** ${corruptionLevel}%\n`;
  docs += `**Vulnerabilities Remaining:** ${vulnerabilities.length}\n\n`;
  docs += `---\n\n`;

  // Document fixed vulnerabilities
  if (fixedTypes.includes('hardcoded-secret')) {
    docs += `## ✅ Fixed: Hardcoded Secret (LeakyComponent.tsx)\n\n`;
    docs += `**Vulnerability Type:** Sensitive Data Exposure (OWASP A02:2021)\n\n`;
    docs += `**Fix Applied:**\n`;
    docs += `- Removed hardcoded API key\n`;
    docs += `- Replaced with environment variable: \`import.meta.env.VITE_API_KEY\`\n`;
    docs += `- Added \`.env.example\` with placeholder\n\n`;
    docs += `**Impact:** High - Prevents credential leakage in source code\n\n`;
    docs += `---\n\n`;
  }

  if (fixedTypes.includes('prompt-injection')) {
    docs += `## ✅ Fixed: Prompt Injection (InjectionComponent.tsx)\n\n`;
    docs += `**Vulnerability Type:** Injection (OWASP A03:2021)\n\n`;
    docs += `**Fix Applied:**\n`;
    docs += `- Removed \`dangerouslySetInnerHTML\`\n`;
    docs += `- Replaced with safe text rendering or DOMPurify sanitization\n`;
    docs += `- Prevented XSS attacks via user input\n\n`;
    docs += `**Impact:** High - Prevents malicious script injection\n\n`;
    docs += `---\n\n`;
  }

  if (fixedTypes.includes('xss')) {
    docs += `## ✅ Fixed: XSS Vulnerability (UnsafeComponent.tsx)\n\n`;
    docs += `**Vulnerability Type:** Cross-Site Scripting (OWASP A03:2021)\n\n`;
    docs += `**Fix Applied:**\n`;
    docs += `- Removed \`eval()\` function call\n`;
    docs += `- Disabled arbitrary code execution\n`;
    docs += `- Replaced with safe alternatives or removed feature\n\n`;
    docs += `**Impact:** Critical - Prevents remote code execution\n\n`;
    docs += `---\n\n`;
  }

  // Document remaining vulnerabilities
  if (vulnerabilities.length > 0) {
    docs += `## ⚠️ Remaining Vulnerabilities\n\n`;
    vulnerabilities.forEach(vuln => {
      docs += `- **${vuln.type}** in ${vuln.file}\n`;
    });
    docs += `\n`;
  } else {
    docs += `## 🎉 All Vulnerabilities Fixed!\n\n`;
    docs += `The codebase is now fully sanctified. All OWASP security issues have been resolved.\n\n`;
  }

  // Write documentation
  fs.writeFileSync(docsFile, docs, 'utf-8');
  console.log(`📝 Security documentation updated: ${docsFile}`);
  console.log(`   Fixed: ${fixedTypes.length} vulnerabilities`);
  console.log(`   Remaining: ${vulnerabilities.length} vulnerabilities`);

} catch (error) {
  console.log('⚠️  Documentation generation skipped:', error.message);
}
