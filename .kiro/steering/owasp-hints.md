---
inclusion: manual
---

# Security Investigation Hints

This document provides hints for finding security vulnerabilities without giving away the exact solutions.

## Common OWASP Vulnerability Patterns

### Pattern 1: Sensitive Data Exposure
Look for:
- Information that should never be committed to source control
- Data that should come from environment variables
- Secrets, keys, or tokens visible in plain text

### Pattern 2: Injection Vulnerabilities
Look for:
- User input being rendered without sanitization
- HTML being inserted directly into the DOM
- Functions that bypass React's built-in XSS protection

### Pattern 3: Code Execution Risks
Look for:
- Dynamic code evaluation
- Functions that execute arbitrary strings as code
- Patterns that allow user input to control program flow

## Investigation Strategy

1. **Ask Kiro to scan**: "What security vulnerabilities exist in the src/components/vulnerable folder?"
2. **Check specific files**: Open files and ask "Does this file have any security issues?"
3. **Use MCP tools**: "What is the current corruption level?" to track progress
4. **Request fixes**: Once you identify an issue, ask "How should I fix this security vulnerability?"

## Hints by Component Type

- **API/Configuration components**: Check how credentials are stored
- **Rendering components**: Check how user input is displayed
- **Execution components**: Check if any code is being dynamically evaluated

Remember: Kiro has access to OWASP security guidelines and can help you fix vulnerabilities once you identify them!
