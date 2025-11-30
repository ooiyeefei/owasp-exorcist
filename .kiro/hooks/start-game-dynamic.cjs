/**
 * Dynamic Game Start Hook
 * Generates unique vulnerable components for each game session
 * Requirements: 9.1, 9.4, 9.5
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function checkDevServer() {
  try {
    const result = execSync('lsof -ti:5173 2>/dev/null || echo ""', { encoding: 'utf-8' });
    return result.trim().length > 0;
  } catch (error) {
    return false;
  }
}

function startDevServer() {
  console.log('🚀 Starting development server...');
  const devServer = spawn('npm', ['run', 'dev'], {
    detached: true,
    stdio: 'ignore'
  });
  devServer.unref();
  console.log('✅ Dev server started! Opening http://localhost:5173\n');
}

/**
 * Generate random vulnerable code based on type
 */
function generateVulnerableCode(type) {
  switch(type) {
    case 'hardcoded-secret':
      // Generate random API key
      const randomKey = 'sk-' + crypto.randomBytes(20).toString('hex');
      return `const API_KEY = "${randomKey}";`;
    
    case 'xss-dangerous-html':
      return `// Will render with dangerouslySetInnerHTML below`;
    
    case 'code-injection':
      return `const executeCode = (code: string) => {
    try {
      return eval(code);
    } catch (e: any) {
      return 'Error: ' + e.message;
    }
  };`;
    
    case 'sql-injection':
      return `const executeQuery = (userId: string) => {
    return \`SELECT * FROM users WHERE id = \${userId}\`;
  };`;
    
    case 'idor':
      return `const getUserData = (userId: string) => {
    // No authorization check!
    return { id: userId, data: 'sensitive info' };
  };`;
    
    case 'missing-validation':
      return `// No input validation implemented`;
    
    case 'insecure-deserialization':
      return `const parseUserData = (jsonString: string) => {
    return JSON.parse(jsonString); // No validation!
  };`;
    
    case 'insufficient-logging':
      return `// No security logging implemented`;
    
    default:
      return `// Vulnerable code pattern`;
  }
}

/**
 * Generate vulnerable handler code
 */
function generateVulnerableHandler(type) {
  switch(type) {
    case 'hardcoded-secret':
      return `console.log('Using API key:', API_KEY);`;
    
    case 'code-injection':
      return `const result = executeCode(input);
    console.log('Executed:', result);`;
    
    case 'sql-injection':
      return `const query = executeQuery(input);
    console.log('Query:', query);`;
    
    case 'idor':
      return `const data = getUserData(input);
    console.log('User data:', data);`;
    
    case 'insecure-deserialization':
      return `try {
      const parsed = parseUserData(input);
      console.log('Parsed:', parsed);
    } catch (e: any) {
      console.error('Parse error:', e);
    }`;
    
    default:
      return `console.log('Processing:', input);`;
  }
}

/**
 * Generate a vulnerable React component from template
 */
function generateComponent(template, difficulty, index) {
  // Sanitize component name - remove special characters
  const sanitizedName = template.name.replace(/[^a-zA-Z0-9]/g, '');
  const componentName = `Vulnerable${sanitizedName}${index}`;
  const filename = `${componentName}.tsx`;
  
  // Select hints based on difficulty
  const hints = difficulty === 'easy' ? template.hints.easy : template.hints.hard;
  const hintComments = difficulty === 'easy' 
    ? hints.map(h => `  // TODO: ${h}`).join('\n')
    : '';
  
  // Generate component code
  const code = `/**
 * ${componentName} - INTENTIONALLY VULNERABLE (Generated)
 * Type: ${template.type}
 * OWASP: ${template.owaspCategory}
 * DO NOT USE IN PRODUCTION
 */

import { useState } from 'react';

export function ${componentName}() {
${hintComments}
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [showAwsServices, setShowAwsServices] = useState(false);

  // VULNERABILITY: ${template.description}
  ${generateVulnerableCode(template.type)}

  const handleSubmit = () => {
    ${generateVulnerableHandler(template.type)}
    setOutput('Processed: ' + input);
  };

  return (
    <div className="vulnerable-component ${template.type}">
      <h3>${template.name}</h3>
      <p className="warning" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
        ⚠️ ${template.severity.toUpperCase()} severity - ${template.owaspCategory}
      </p>
      
      ${difficulty === 'easy' ? `<div style={{ 
        background: 'rgba(255, 193, 7, 0.1)', 
        padding: '0.75rem', 
        borderRadius: '8px', 
        marginBottom: '1rem',
        border: '1px solid rgba(255, 193, 7, 0.3)'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#ffc107' }}>
          💡 <strong>Hint:</strong> ${hints[0]}
        </p>
      </div>` : ''}

      <div className="input-section">
        <label htmlFor="${componentName}-input">
          Test the vulnerability (optional):
        </label>
        <textarea
          id="${componentName}-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try entering test data to see the vulnerability in action..."
          rows={3}
        />
      </div>
      <button onClick={handleSubmit}>Test Submit</button>
      {output && (
        <div className="output-section">
          <p><strong>Output:</strong></p>
          ${template.type === 'xss-dangerous-html' ? 
            `<div dangerouslySetInnerHTML={{ __html: output }} />` : 
            `<code>{output}</code>`}
        </div>
      )}
      
      ${template.educationalContent && template.educationalContent.awsServices ? `
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(255, 153, 0, 0.1)',
        borderRadius: '8px',
        border: '2px solid rgba(255, 153, 0, 0.3)'
      }}>
        <div 
          onClick={() => setShowAwsServices(!showAwsServices)}
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: showAwsServices ? '0.75rem' : '0'
          }}
        >
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#FFA500' }}>
            ☁️ AWS SECURITY SERVICES FOR THIS VULNERABILITY
          </p>
          <span style={{ fontSize: '1.5rem', color: '#FFA500', userSelect: 'none', lineHeight: '1' }}>
            {showAwsServices ? '⌃' : '⌄'}
          </span>
        </div>
        
        {showAwsServices && (
          <>
            <p style={{ margin: '0.75rem 0 1rem 0', fontSize: '0.85rem', opacity: 0.9 }}>
              ${template.educationalContent.analogy}
            </p>
        ${template.educationalContent.awsServices.map((service, idx) => `
        <div style={{ 
          marginBottom: '${idx < template.educationalContent.awsServices.length - 1 ? '1rem' : '0'}',
          paddingBottom: '${idx < template.educationalContent.awsServices.length - 1 ? '1rem' : '0'}',
          borderBottom: '${idx < template.educationalContent.awsServices.length - 1 ? '1px solid rgba(255, 153, 0, 0.2)' : 'none'}'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#FFA500' }}>
            🔧 ${service.name}
          </p>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>
            ${service.description}
          </p>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>
            <strong>Use Case:</strong> ${service.useCase}
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem' }}>
            <a href="${service.documentationUrl}" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>
              📚 Learn more →
            </a>
          </p>
        </div>
        `).join('')}
            <p style={{ margin: '1rem 0 0 0', fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.8 }}>
              💡 <strong>Real-world impact:</strong> ${template.educationalContent.realWorldImpact}
            </p>
          </>
        )}
      </div>
      ` : ''}
    </div>
  );
}

export default ${componentName};
`;

  return { filename, componentName, code, template };
}

/**
 * Generate detection pattern for each vulnerability type
 */
function getDetectionPattern(type) {
  switch(type) {
    case 'hardcoded-secret':
      return {
        type: 'regex',
        pattern: 'sk-[a-zA-Z0-9]{40}',
        description: 'Look for sk- followed by 40 hex characters',
        fixIndicators: ['import.meta.env', 'process.env']
      };
    
    case 'xss-dangerous-html':
      return {
        type: 'string',
        pattern: 'dangerouslySetInnerHTML',
        description: 'Look for dangerouslySetInnerHTML usage',
        fixIndicators: ['DOMPurify.sanitize', 'removed dangerouslySetInnerHTML']
      };
    
    case 'code-injection':
      return {
        type: 'regex',
        pattern: 'eval\\s*\\(',
        description: 'Look for eval() function calls',
        fixIndicators: ['removed eval', 'safe alternative']
      };
    
    case 'sql-injection':
      return {
        type: 'string',
        pattern: 'SELECT * FROM',
        description: 'Look for SQL string concatenation',
        fixIndicators: ['parameterized', 'prepared statement', '?', '$1']
      };
    
    case 'idor':
      return {
        type: 'string',
        pattern: 'getUserData',
        description: 'Look for direct object access without auth',
        fixIndicators: ['checkAuthorization', 'verifyOwnership', 'hasPermission']
      };
    
    case 'missing-validation':
      return {
        type: 'comment',
        pattern: 'No input validation implemented',
        description: 'Look for missing input validation comment',
        fixIndicators: ['validate', 'schema', 'zod', 'yup']
      };
    
    case 'insecure-deserialization':
      return {
        type: 'string',
        pattern: 'JSON.parse',
        description: 'Look for JSON.parse without validation',
        fixIndicators: ['validate', 'schema', 'zod', 'yup']
      };
    
    case 'insufficient-logging':
      return {
        type: 'comment',
        pattern: 'No security logging implemented',
        description: 'Look for missing security logging comment',
        fixIndicators: ['logger', 'audit', 'securityLog']
      };
    
    default:
      return {
        type: 'string',
        pattern: 'VULNERABILITY',
        description: 'Generic vulnerability pattern',
        fixIndicators: ['FIXED', 'secure']
      };
  }
}

/**
 * Load templates from JSON files
 */
function loadTemplates() {
  const templatesDir = path.join(process.cwd(), '.kiro', 'templates', 'vulnerabilities');
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(templatesDir, file), 'utf-8');
    return JSON.parse(content);
  });
}

/**
 * Select vulnerabilities based on difficulty
 */
function selectVulnerabilities(templates, difficulty) {
  const count = difficulty === 'easy' ? 3 : Math.floor(Math.random() * 2) + 4;
  
  // Shuffle templates
  const shuffled = templates.sort(() => Math.random() - 0.5);
  
  // Select unique OWASP categories
  const selected = [];
  const usedCategories = new Set();
  
  for (const template of shuffled) {
    if (selected.length >= count) break;
    if (!usedCategories.has(template.owaspCategory)) {
      selected.push(template);
      usedCategories.add(template.owaspCategory);
    }
  }
  
  return selected;
}

function main() {
  console.log('🔮 Initiating Dynamic Digital Exorcism...\n');

  try {
    // Check if dev server is running
    const serverRunning = checkDevServer();
    if (!serverRunning) {
      startDevServer();
    } else {
      console.log('✅ Dev server is already running!\n');
    }

    // Get difficulty from command line args or default to 'easy'
    const difficulty = process.argv[2] || 'easy';
    console.log(`🎯 Difficulty: ${difficulty.toUpperCase()}\n`);

    // Load templates
    console.log('📚 Loading vulnerability templates...');
    const templates = loadTemplates();
    console.log(`✅ Loaded ${templates.length} templates\n`);

    // Select vulnerabilities
    console.log('🎲 Selecting vulnerabilities...');
    const selected = selectVulnerabilities(templates, difficulty);
    console.log(`✅ Selected ${selected.length} vulnerabilities:\n`);
    selected.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.name} (${t.owaspCategory})`);
    });
    console.log();

    // Generate components
    console.log('⚡ Generating vulnerable components...');
    const generatedDir = path.join(process.cwd(), 'src', 'components', 'vulnerable', 'generated');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }

    // Clean up old generated files
    const existingFiles = fs.readdirSync(generatedDir).filter(f => f.endsWith('.tsx'));
    existingFiles.forEach(file => {
      fs.unlinkSync(path.join(generatedDir, file));
    });

    // Generate new components
    const generatedComponents = [];
    selected.forEach((template, index) => {
      const { filename, componentName, code, template: tpl } = generateComponent(template, difficulty, index + 1);
      const filepath = path.join(generatedDir, filename);
      
      fs.writeFileSync(filepath, code);
      console.log(`   ✅ Generated ${filename}`);
      
      generatedComponents.push({
        filename,
        componentName,
        vulnerabilityType: tpl.type,
        owaspCategory: tpl.owaspCategory,
        difficulty: tpl.difficultyRange.min,
        hints: difficulty === 'easy' ? tpl.hints.easy : tpl.hints.hard,
        generatedAt: new Date().toISOString(),
        templateId: tpl.id,
      });
    });
    console.log();

    // Update corruption state
    console.log('💀 Updating corruption state...');
    const sessionId = crypto.randomBytes(8).toString('hex');
    
    const corruptionState = {
      corruptionLevel: 100,
      totalVulnerabilities: selected.length, // Store original total for correct percentage calculation
      vulnerabilities: selected.map((tpl, index) => ({
        type: tpl.type,
        file: `generated/${generatedComponents[index].filename}`,
        pattern: tpl.codePattern.vulnerablePattern,
        description: tpl.description,
        severity: tpl.severity,
        count: 1,
        componentName: generatedComponents[index].componentName,
        owaspCategory: tpl.owaspCategory,
        hints: difficulty === 'easy' ? tpl.hints.easy : [],
        generatedAt: new Date().toISOString(),
        // Add detection pattern for measure script
        detection: getDetectionPattern(tpl.type)
      })),
      sessionId,
      difficulty,
      generatedComponents,
      timestamp: Date.now(),
      lastScan: new Date().toISOString(),
      scanDuration: 0,
    };

    const outputPath = path.join(process.cwd(), 'public', 'corruption-state.json');
    fs.writeFileSync(outputPath, JSON.stringify(corruptionState, null, 2));
    console.log('✅ Corruption state updated\n');

    // Success message
    console.log('🎉 Dynamic game generation complete!\n');
    console.log('📊 Session Details:');
    console.log(`   Session ID: ${sessionId}`);
    console.log(`   Difficulty: ${difficulty}`);
    console.log(`   Components: ${generatedComponents.length}`);
    console.log(`   Corruption: 100%\n`);
    
    console.log('🎮 Game is ready!');
    console.log('   📱 Open http://localhost:5173 to see the haunted dashboard');
    console.log('   🎯 Fix the vulnerabilities to reduce corruption\n');
    
    console.log('💡 Pro Tips:');
    console.log('   • Each session generates unique vulnerabilities');
    console.log('   • Components are in src/components/vulnerable/generated/');
    console.log('   • Ask Kiro: "Fix the security vulnerability in this file"');
    console.log('   • Use MCP: "What is the current corruption level?"\n');
    
  } catch (error) {
    console.error('❌ Error during game initialization:', error.message);
    process.exit(1);
  }
}

main();
