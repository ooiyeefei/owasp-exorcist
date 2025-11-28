# The Exorcism Rules: OWASP Security Fixes

This steering document teaches Kiro how to fix security vulnerabilities in The Digital Exorcism project.

## Rule 1: Never Hardcode Secrets

When you see hardcoded API keys, tokens, or secrets, replace them with environment variables.

### ❌ Bad (Corrupted):
```typescript
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz1234567890";
```

### ✅ Good (Sanctified):
```typescript
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Fix Instructions:
1. Remove the hardcoded secret value
2. Replace with `import.meta.env.VITE_VARIABLE_NAME`
3. Add the variable to `.env` file (not committed to git)
4. Update `.env.example` with placeholder value
5. **CRITICAL**: After applying the fix, run `node .kiro/hooks/measure-corruption.cjs` to update the corruption state

---

## Rule 2: Never Use dangerouslySetInnerHTML

When you see `dangerouslySetInnerHTML`, replace it with safe text rendering or sanitized HTML.

### ❌ Bad (Corrupted):
```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### ✅ Good (Sanctified) - Option A: Plain Text:
```typescript
<div>{userInput}</div>
```

### ✅ Good (Sanctified) - Option B: Sanitized HTML (if HTML is required):
```typescript
import DOMPurify from 'dompurify';

<div>{DOMPurify.sanitize(userInput)}</div>
```

### Fix Instructions:
1. Remove `dangerouslySetInnerHTML` prop entirely
2. Render content as plain text using `{variable}` syntax
3. If HTML rendering is absolutely required, use DOMPurify to sanitize
4. Consider if HTML rendering is actually needed - plain text is safer
5. **CRITICAL**: After applying the fix, run `node .kiro/hooks/measure-corruption.cjs` to update the corruption state

---

## Rule 3: Never Use eval()

When you see `eval()`, delete it and use safe alternatives.

### ❌ Bad (Corrupted):
```typescript
const result = eval(userCode);
```

### ✅ Good (Sanctified) - Remove Dynamic Execution:
```typescript
// Don't execute user-provided code
// Instead, use predefined safe operations
const result = "Code execution disabled for security";
```

### ✅ Good (Sanctified) - For Math Expressions Only:
```typescript
// If you need to evaluate math expressions, use a safe parser
// Or simply don't allow dynamic code execution
const safeOperations = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
};
```

### Fix Instructions:
1. Remove the `eval()` call entirely
2. Replace with a static message or safe alternative
3. Never execute user-provided code
4. If math evaluation is needed, use a safe math parser library
5. **CRITICAL**: After applying the fix, run `node .kiro/hooks/measure-corruption.cjs` to update the corruption state

---

## Quick Reference

| Vulnerability | Pattern to Find | Fix |
|--------------|-----------------|-----|
| Hardcoded Secret | `sk-[a-zA-Z0-9]+` | Use `import.meta.env.VITE_*` |
| Prompt Injection | `dangerouslySetInnerHTML` | Use plain text `{variable}` |
| XSS | `eval(` | Remove and use safe alternatives |

## Example Fixes for This Project

### LeakyComponent.tsx
Replace:
```typescript
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz1234567890";
```
With:
```typescript
const API_KEY = import.meta.env.VITE_API_KEY || "API_KEY_NOT_SET";
```

### InjectionComponent.tsx
Replace:
```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```
With:
```typescript
<div className="rendered-html">{userInput}</div>
```

### UnsafeComponent.tsx
Replace:
```typescript
const output = eval(code);
```
With:
```typescript
const output = "⚠️ Code execution disabled for security";
```
