/**
 * Start Game Hook - Initializes The Digital Exorcism gameplay
 * Resets vulnerabilities, starts dev server, and provides game instructions
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkDevServer() {
  try {
    // Check if port 5173 is in use (Vite default)
    const result = execSync('lsof -ti:5173 2>/dev/null || echo ""', { encoding: 'utf-8' });
    return result.trim().length > 0;
  } catch (error) {
    return false;
  }
}

function startDevServer() {
  console.log('🚀 Starting development server...');
  
  // Start dev server in background
  const devServer = spawn('npm', ['run', 'dev'], {
    detached: true,
    stdio: 'ignore'
  });
  
  devServer.unref();
  console.log('✅ Dev server started! Opening http://localhost:5173\n');
}

function main() {
  console.log('🔮 Initiating The Digital Exorcism...\n');

  try {
    // Check if dev server is running
    const serverRunning = checkDevServer();
    if (!serverRunning) {
      startDevServer();
    } else {
      console.log('✅ Dev server is already running!\n');
    }

    // Reset vulnerable components using git
    console.log('👻 Restoring haunted components...');
    try {
      execSync('git checkout src/components/vulnerable/', { stdio: 'pipe' });
    } catch (error) {
      console.warn('⚠️  Could not reset via git. Files may not be tracked yet.');
    }

    // Reset corruption state to 100%
    console.log('💀 Setting corruption level to 100%...');
    const corruptionState = {
      corruptionLevel: 100,
      vulnerabilities: [
        {
          type: 'hardcoded-secret',
          file: 'LeakyComponent.tsx',
          pattern: '/sk-[a-zA-Z0-9]{20,}/gi',
          description: 'Hardcoded API key or secret detected',
          severity: 'high',
          count: 1
        },
        {
          type: 'prompt-injection',
          file: 'InjectionComponent.tsx',
          pattern: '/dangerouslySetInnerHTML/gi',
          description: 'Unsafe HTML rendering detected (dangerouslySetInnerHTML)',
          severity: 'high',
          count: 1
        },
        {
          type: 'xss',
          file: 'UnsafeComponent.tsx',
          pattern: '/eval\\\\s*\\\\(/gi',
          description: 'XSS vulnerability pattern detected (eval)',
          severity: 'high',
          count: 1
        }
      ],
      timestamp: Date.now(),
      lastScan: new Date().toISOString(),
      scanDuration: 0
    };

    const outputPath = path.join(process.cwd(), 'public', 'corruption-state.json');
    fs.writeFileSync(outputPath, JSON.stringify(corruptionState, null, 2));

    console.log('\n✅ Game reset complete!\n');
    console.log('The codebase is now fully haunted with:');
    console.log('  🔑 Hardcoded Secret (LeakyComponent.tsx)');
    console.log('  💉 Prompt Injection (InjectionComponent.tsx)');
    console.log('  ⚡ XSS via eval() (UnsafeComponent.tsx)\n');
    console.log('🎮 Game is ready!');
    console.log('   📱 Open http://localhost:5173 to see the haunted dashboard');
    console.log('   🎯 Choose your difficulty:');
    console.log('      • Easy Mode: See all vulnerabilities and file names');
    console.log('      • Hard Mode: Detective mode with hints only\n');
    console.log('💡 Pro Tips:');
    console.log('   • Ask me: "What is the current corruption level?"');
    console.log('   • Ask me: "What are the OWASP Top 10 vulnerabilities?"');
    console.log('   • Ask me: "Tell me about XSS vulnerabilities"\n');
    
  } catch (error) {
    console.error('❌ Error during game initialization:', error.message);
    process.exit(1);
  }
}

main();
