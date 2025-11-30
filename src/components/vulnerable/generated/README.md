# Generated Vulnerable Components

This directory contains dynamically generated vulnerable React components for The Digital Exorcism game.

## ⚠️ Important

- **DO NOT** manually create files here
- **DO NOT** commit generated files to git
- Files are automatically generated when you start a new game session
- Files are automatically cleaned up when a session ends

## How It Works

1. Player starts a new game via the start-game hook
2. Kiro generates 3-5 unique vulnerable components based on OWASP templates
3. Components are written to this directory
4. Dashboard dynamically imports and displays them
5. Player fixes vulnerabilities in Kiro IDE
6. Corruption level drops as vulnerabilities are fixed
7. Session ends, files are cleaned up

## File Naming Convention

Generated files follow this pattern:
- `VulnerableAuth.tsx`
- `VulnerableDataFetch.tsx`
- `VulnerableUserInput.tsx`

Each file contains:
- A functional React component
- An intentional security vulnerability
- TypeScript types and proper imports
- Hints (in Easy mode) or realistic code (in Hard mode)

## Troubleshooting

If you see errors about missing components:
1. Check that the game session is active
2. Verify corruption-state.json has `generatedComponents` array
3. Try restarting the game with the start-game hook
4. Check console for generation errors

## Development

To test generation locally:
```bash
node .kiro/hooks/start-game-dynamic.cjs
```

This will trigger Kiro to generate components and update the corruption state.
