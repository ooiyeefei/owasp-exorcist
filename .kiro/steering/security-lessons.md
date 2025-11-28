# Security Lessons - Quick Reference

Use these bite-sized lessons when explaining fixes to users. Keep them fun, memorable, and educational!

## 🔑 Hardcoded Secrets (A02:2021 - Cryptographic Failures)

### The Problem:
Putting API keys, passwords, or tokens directly in your code is like writing your bank PIN on your forehead.

### The Fix:
```typescript
// ❌ BAD - Visible to everyone
const API_KEY = "sk-1234567890...";

// ✅ GOOD - Hidden in environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Why It Matters:
- **Git never forgets**: Even if you delete it later, it's in your git history forever
- **Bots are watching**: Automated scanners find exposed keys in minutes
- **Real cost**: Companies pay millions in fines for exposed credentials

### Fun Analogy:
"It's like leaving your house key under the doormat - everyone knows to look there!"

---

## 💉 XSS / dangerouslySetInnerHTML (A03:2021 - Injection)

### The Problem:
Rendering user input as HTML without sanitization lets attackers inject malicious scripts.

### The Fix:
```typescript
// ❌ BAD - Executes any HTML/JS
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GOOD - Renders as safe text
<div>{userInput}</div>

// ✅ ALSO GOOD - Sanitized HTML (if HTML is needed)
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### Why It Matters:
- **Session hijacking**: Attackers can steal user login sessions
- **Data theft**: Can access cookies, localStorage, and sensitive data
- **Real cost**: British Airways paid $230M after an XSS attack

### Fun Analogy:
"It's like inviting a vampire into your home - once they're in, chaos ensues! 🧛"

---

## ⚡ eval() (A03:2021 - Injection)

### The Problem:
`eval()` executes ANY string as code, including malicious code from attackers.

### The Fix:
```typescript
// ❌ BAD - Executes anything
const result = eval(userCode);

// ✅ GOOD - Don't execute user code at all
const result = "Code execution disabled for security";

// ✅ ALSO GOOD - Use safe alternatives
const result = JSON.parse(jsonString); // For JSON
const result = new Function('return ' + mathExpression)(); // For math (still risky!)
```

### Why It Matters:
- **Complete control**: Attackers can run ANY code on your server/client
- **Data access**: Can read files, steal data, install malware
- **Real cost**: Major breaches start with code execution vulnerabilities

### Fun Analogy:
"It's like giving a stranger the keys to your car AND your house. Just... don't. 🚗🏠"

---

## 🎯 Quick Security Rules

1. **Never trust user input** - Always validate and sanitize
2. **Secrets belong in .env** - Never in code or git
3. **Use safe APIs** - React's default rendering, JSON.parse(), etc.
4. **When in doubt, ask** - Security is hard, asking for help is smart

---

## 📚 Want to Learn More?

- **OWASP Top 10**: https://owasp.org/Top10/
- **Ask me**: "What are the OWASP Top 10 vulnerabilities?"
- **Deep dive**: "Tell me more about [vulnerability type]"

---

## 🎮 Remember:

Security isn't about being paranoid - it's about being prepared. Every fix you make protects real users from real threats. You're not just writing code, you're building trust! 🛡️
