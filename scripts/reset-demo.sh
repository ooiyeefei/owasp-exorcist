#!/bin/bash

# Reset Demo Script for The Digital Exorcism
# This script resets the codebase to its "haunted" state for demo purposes

echo "🔮 Initiating The Ritual Reset..."
echo ""

# Reset vulnerable components to their original corrupted state
echo "👻 Restoring haunted components..."
git checkout src/components/vulnerable/ 2>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Git checkout failed. Components may not be tracked yet."
    echo "    Make sure to commit the vulnerable components first!"
fi

# Reset corruption state to 100%
echo "💀 Setting corruption level to 100%..."
cat > public/corruption-state.json << 'EOF'
{
  "corruptionLevel": 100,
  "vulnerabilities": [
    {
      "type": "hardcoded-secret",
      "file": "LeakyComponent.tsx",
      "pattern": "/sk-[a-zA-Z0-9]{20,}/gi",
      "description": "Hardcoded API key or secret detected",
      "severity": "high",
      "count": 1
    },
    {
      "type": "prompt-injection",
      "file": "InjectionComponent.tsx",
      "pattern": "/dangerouslySetInnerHTML/gi",
      "description": "Unsafe HTML rendering detected (dangerouslySetInnerHTML)",
      "severity": "high",
      "count": 1
    },
    {
      "type": "xss",
      "file": "UnsafeComponent.tsx",
      "pattern": "/eval\\s*\\(/gi",
      "description": "XSS vulnerability pattern detected (eval)",
      "severity": "high",
      "count": 1
    }
  ],
  "timestamp": $(date +%s)000,
  "lastScan": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)",
  "scanDuration": 0
}
EOF

echo ""
echo "✅ Demo reset complete!"
echo ""
echo "The codebase is now fully haunted with:"
echo "  🔑 Hardcoded Secret (LeakyComponent.tsx)"
echo "  💉 Prompt Injection (InjectionComponent.tsx)"
echo "  ⚡ XSS via eval() (UnsafeComponent.tsx)"
echo ""
echo "🎬 Ready for the 3-minute demo!"
echo "   1. Start the dev server: npm run dev"
echo "   2. Click 'ENTER THE NIGHTMARE'"
echo "   3. Ask Kiro: 'What is the current corruption level?'"
echo "   4. Fix vulnerabilities with Kiro and watch the UI heal!"
