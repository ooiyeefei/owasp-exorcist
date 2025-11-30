# Vulnerability Templates

This directory contains JSON templates for dynamically generating vulnerable React components in The Digital Exorcism game.

## Template Format

Each template must follow this structure:

```json
{
  "id": "unique-identifier",
  "owaspCategory": "A0X:2021",
  "type": "vulnerability-type",
  "name": "Display Name",
  "description": "Brief description",
  "severity": "low|medium|high|critical",
  "difficultyRange": {
    "min": 1,
    "max": 10
  },
  "codePattern": {
    "vulnerablePattern": "code showing the vulnerability",
    "fixPattern": "code showing the fix"
  },
  "hints": {
    "easy": ["Obvious hints for Easy mode"],
    "hard": ["Subtle hints for Hard mode"]
  },
  "educationalContent": {
    "analogy": "Fun metaphor",
    "realWorldImpact": "Real breach examples",
    "preventionTip": "How to prevent",
    "awsServices": [
      {
        "name": "AWS Service Name",
        "description": "What it does",
        "useCase": "How it helps with this vulnerability",
        "documentationUrl": "https://aws.amazon.com/..."
      }
    ]
  }
}
```

## Required Fields

- `id`: Unique identifier
- `owaspCategory`: OWASP classification (e.g., "A02:2021")
- `type`: Vulnerability type (e.g., "hardcoded-secret")
- `name`: Display name
- `codePattern.vulnerablePattern`: Example of vulnerable code
- `codePattern.fixPattern`: Example of fixed code
- `educationalContent.awsServices`: At least one AWS service recommendation

## Adding New Templates

1. Create a new JSON file in this directory
2. Follow the template format above
3. Ensure all required fields are present
4. Run validation: `npm test -- templateValidator.test.ts`
5. Templates are automatically loaded by the game

## Existing Templates

- `hardcoded-secret.json` - API keys and secrets in source code
- `xss-dangerous-html.json` - XSS via dangerouslySetInnerHTML
- `code-injection-eval.json` - Code injection via eval()
- `sql-injection.json` - SQL injection vulnerabilities
- `idor.json` - Insecure Direct Object Reference
- `missing-validation.json` - Missing input validation
- `insecure-deserialization.json` - Unsafe deserialization
- `insufficient-logging.json` - Missing security logging
