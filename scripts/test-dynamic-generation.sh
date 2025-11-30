#!/bin/bash

# Test Dynamic Vulnerability Generation System
# This script tests the complete dynamic generation workflow

echo "🧪 Testing Dynamic Vulnerability Generation System"
echo "=================================================="
echo ""

# Test 1: Template Loading
echo "📚 Test 1: Loading vulnerability templates..."
if [ -d ".kiro/templates/vulnerabilities" ]; then
  TEMPLATE_COUNT=$(ls -1 .kiro/templates/vulnerabilities/*.json 2>/dev/null | wc -l)
  echo "✅ Found $TEMPLATE_COUNT templates"
else
  echo "❌ Template directory not found"
  exit 1
fi

# Test 2: Template Validation
echo ""
echo "🔍 Test 2: Validating templates..."
npm test -- templateLoader.test.ts --run --reporter=dot
if [ $? -eq 0 ]; then
  echo "✅ All templates valid"
else
  echo "❌ Template validation failed"
  exit 1
fi

# Test 3: History Manager
echo ""
echo "📊 Test 3: Testing history manager..."
npm test -- historyManager.test.ts --run --reporter=dot
if [ $? -eq 0 ]; then
  echo "✅ History manager working"
else
  echo "❌ History manager tests failed"
  exit 1
fi

# Test 4: Vulnerability Selector
echo ""
echo "🎲 Test 4: Testing vulnerability selector..."
npm test -- vulnerabilitySelector.test.ts --run --reporter=dot
if [ $? -eq 0 ]; then
  echo "✅ Vulnerability selector working"
else
  echo "❌ Vulnerability selector tests failed"
  exit 1
fi

# Test 5: Easy Mode Generation
echo ""
echo "🎮 Test 5: Generating Easy mode session..."
node .kiro/hooks/start-game-dynamic.cjs easy > /dev/null 2>&1
if [ $? -eq 0 ]; then
  EASY_COUNT=$(ls -1 src/components/vulnerable/generated/*.tsx 2>/dev/null | wc -l)
  if [ "$EASY_COUNT" -eq 3 ]; then
    echo "✅ Easy mode generated 3 components"
  else
    echo "❌ Easy mode generated $EASY_COUNT components (expected 3)"
    exit 1
  fi
else
  echo "❌ Easy mode generation failed"
  exit 1
fi

# Test 6: Hard Mode Generation
echo ""
echo "🎮 Test 6: Generating Hard mode session..."
node .kiro/hooks/start-game-dynamic.cjs hard > /dev/null 2>&1
if [ $? -eq 0 ]; then
  HARD_COUNT=$(ls -1 src/components/vulnerable/generated/*.tsx 2>/dev/null | wc -l)
  if [ "$HARD_COUNT" -ge 4 ] && [ "$HARD_COUNT" -le 5 ]; then
    echo "✅ Hard mode generated $HARD_COUNT components (4-5 expected)"
  else
    echo "❌ Hard mode generated $HARD_COUNT components (expected 4-5)"
    exit 1
  fi
else
  echo "❌ Hard mode generation failed"
  exit 1
fi

# Test 7: Corruption State
echo ""
echo "💀 Test 7: Checking corruption state..."
if [ -f "public/corruption-state.json" ]; then
  CORRUPTION_LEVEL=$(cat public/corruption-state.json | grep -o '"corruptionLevel": *[0-9]*' | grep -o '[0-9]*')
  if [ "$CORRUPTION_LEVEL" = "100" ]; then
    echo "✅ Corruption state updated (100%)"
  else
    echo "❌ Corruption level is $CORRUPTION_LEVEL (expected 100)"
    exit 1
  fi
else
  echo "❌ Corruption state file not found"
  exit 1
fi

# Test 8: Build
echo ""
echo "🏗️  Test 8: Building application..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Application builds successfully"
else
  echo "❌ Build failed"
  exit 1
fi

# Summary
echo ""
echo "=================================================="
echo "✅ All tests passed! Dynamic generation working!"
echo "=================================================="
echo ""
echo "📊 Summary:"
echo "  • $TEMPLATE_COUNT vulnerability templates loaded"
echo "  • Easy mode: 3 components"
echo "  • Hard mode: $HARD_COUNT components"
echo "  • Corruption state: 100%"
echo "  • Build: Success"
echo ""
echo "🎮 Ready to play! Run: npm run dev"
