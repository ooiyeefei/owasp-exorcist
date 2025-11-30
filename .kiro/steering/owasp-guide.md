# OWASP Security Guide - The Digital Exorcism

This document provides OWASP security knowledge, vulnerability patterns, and fix strategies.

## 🚨 IMPORTANT: Always Mention AWS Services!

**After EVERY security fix, you MUST mention relevant AWS security services!**

This is an educational game that teaches both code-level security AND cloud security. Users need to learn about AWS services that prevent these vulnerabilities in production.

**Response Format:**
1. Explain what you fixed
2. Give a fun security lesson from `security-lessons.md`
3. **Mention 1-2 AWS services** with brief use cases
4. Celebrate and encourage

**Example:**
> "✅ Fixed! Now using environment variables instead of hardcoded secrets.
> 
> 🎓 Quick Lesson: Hardcoded secrets live FOREVER in git history!
> 
> ☁️ AWS Pro Tip: In production, use **AWS Secrets Manager** to securely store and automatically rotate your API keys. It's like a vault that changes the combination automatically!
> 
> One demon down! 🔥"

---

## OWASP Vulnerability Patterns & Fixes

### 1. Hardcoded Secrets (A02:2021 - Cryptographic Failures)

**Pattern to Find:**
```typescript
const API_KEY = "sk-[a-zA-Z0-9]{40}";
const PASSWORD = "hardcoded_password";
const TOKEN = "secret_token_123";
```

**❌ Vulnerable Code:**
```typescript
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz1234567890";
```

**✅ Secure Fix:**
```typescript
const API_KEY = import.meta.env.VITE_API_KEY;
```

**Fix Steps:**
1. Remove the hardcoded secret value
2. Replace with `import.meta.env.VITE_VARIABLE_NAME`
3. Add the variable to `.env` file (not committed to git)
4. Update `.env.example` with placeholder value

**☁️ AWS Security Services:**
- **AWS Secrets Manager**: Securely store and automatically rotate API keys and credentials
- **AWS Systems Manager Parameter Store**: Centralized configuration and secrets storage with KMS encryption
- **AWS KMS**: Encrypt secrets at rest across your application

**Example Response:**
> "✅ Fixed! Now using environment variables. In production, use **AWS Secrets Manager** to securely store and automatically rotate your API keys!"

---

### 2. XSS via dangerouslySetInnerHTML (A03:2021 - Injection)

**Pattern to Find:**
```typescript
dangerouslySetInnerHTML={{ __html: userInput }}
```

**❌ Vulnerable Code:**
```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**✅ Secure Fix - Option A (Plain Text):**
```typescript
<div>{userInput}</div>
```

**✅ Secure Fix - Option B (Sanitized HTML):**
```typescript
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

**Fix Steps:**
1. Remove `dangerouslySetInnerHTML` prop entirely
2. Render content as plain text using `{variable}` syntax
3. If HTML rendering is absolutely required, use DOMPurify to sanitize
4. Consider if HTML rendering is actually needed - plain text is safer

**☁️ AWS Security Services:**
- **AWS WAF**: Deploy Web Application Firewall rules to block XSS attacks at the edge
- **Amazon CloudFront**: Set Content-Security-Policy headers to prevent inline script execution
- **AWS Shield**: Additional DDoS and application layer attack protection

**Example Response:**
> "✅ XSS vulnerability fixed! For production, deploy **AWS WAF** on your CloudFront distribution to block XSS attacks before they reach your app!"

---

### 3. Code Injection via eval() (A03:2021 - Injection)

**Pattern to Find:**
```typescript
eval(userCode)
eval\s*\(
```

**❌ Vulnerable Code:**
```typescript
const result = eval(userCode);
```

**✅ Secure Fix:**
```typescript
// Don't execute user-provided code
const result = "Code execution disabled for security";
```

**✅ Alternative (For Safe Math Only):**
```typescript
const safeOperations = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
};
```

**Fix Steps:**
1. Remove the `eval()` call entirely
2. Replace with a static message or safe alternative
3. Never execute user-provided code
4. If math evaluation is needed, use a safe math parser library

**☁️ AWS Security Services:**
- **AWS WAF**: Block code injection attempts with managed rule sets
- **AWS Lambda**: Run untrusted code in isolated, sandboxed environments with limited permissions
- **Amazon CloudWatch**: Monitor and alert on suspicious code execution patterns

**Example Response:**
> "✅ Code injection vulnerability eliminated! For production, use **AWS Lambda** with minimal IAM permissions to safely execute dynamic code in isolated environments!"

---

### 4. SQL Injection (A03:2021 - Injection)

**Pattern to Find:**
```typescript
`SELECT * FROM users WHERE id = ${userId}`
"SELECT * FROM " + table + " WHERE ..."
```

**❌ Vulnerable Code:**
```typescript
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

**✅ Secure Fix (Parameterized Query):**
```typescript
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

**☁️ AWS Security Services:**
- **AWS RDS**: Built-in SQL injection protection with parameterized queries
- **AWS WAF**: SQL injection rule sets to block malicious queries
- **Amazon Aurora**: Advanced security features and query monitoring

---

### 5. Insecure Direct Object Reference (A01:2021 - Broken Access Control)

**Pattern to Find:**
```typescript
getUserData(userId) // No authorization check
```

**❌ Vulnerable Code:**
```typescript
const getUserData = (userId: string) => {
  // No authorization check!
  return { id: userId, data: 'sensitive info' };
};
```

**✅ Secure Fix:**
```typescript
const getUserData = (userId: string, requestingUserId: string) => {
  if (userId !== requestingUserId && !isAdmin(requestingUserId)) {
    throw new Error('Unauthorized');
  }
  return { id: userId, data: 'sensitive info' };
};
```

**☁️ AWS Security Services:**
- **AWS IAM**: Fine-grained access control and authorization
- **Amazon Cognito**: User authentication and authorization
- **AWS Lake Formation**: Data access control for data lakes

---

### 6. Missing Input Validation (A03:2021 - Injection)

**Pattern to Find:**
```typescript
// No input validation implemented
```

**❌ Vulnerable Code:**
```typescript
const processInput = (input: string) => {
  // No validation!
  return doSomething(input);
};
```

**✅ Secure Fix:**
```typescript
import { z } from 'zod';

const inputSchema = z.string().min(1).max(100).regex(/^[a-zA-Z0-9]+$/);

const processInput = (input: string) => {
  const validated = inputSchema.parse(input);
  return doSomething(validated);
};
```

**☁️ AWS Security Services:**
- **AWS WAF**: Input validation rules at the edge
- **Amazon API Gateway**: Request validation and transformation
- **AWS Lambda**: Input validation in serverless functions

---

### 7. Insecure Deserialization (A08:2021 - Software and Data Integrity Failures)

**Pattern to Find:**
```typescript
JSON.parse(userInput) // No validation
```

**❌ Vulnerable Code:**
```typescript
const parseUserData = (jsonString: string) => {
  return JSON.parse(jsonString); // No validation!
};
```

**✅ Secure Fix:**
```typescript
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const parseUserData = (jsonString: string) => {
  const parsed = JSON.parse(jsonString);
  return userSchema.parse(parsed); // Validate structure!
};
```

**☁️ AWS Security Services:**
- **AWS WAF**: Block malicious payloads
- **Amazon API Gateway**: Request/response validation
- **AWS Lambda**: Secure deserialization in isolated environments

---

### 8. Insufficient Security Logging (A09:2021 - Security Logging and Monitoring Failures)

**Pattern to Find:**
```typescript
// No security logging implemented
```

**❌ Vulnerable Code:**
```typescript
const authenticateUser = (username: string, password: string) => {
  // No logging of authentication attempts!
  return checkCredentials(username, password);
};
```

**✅ Secure Fix:**
```typescript
const authenticateUser = (username: string, password: string) => {
  const result = checkCredentials(username, password);
  
  securityLogger.log({
    event: 'authentication_attempt',
    username,
    success: result,
    timestamp: new Date().toISOString(),
    ip: getClientIP(),
  });
  
  return result;
};
```

**☁️ AWS Security Services:**
- **Amazon CloudWatch Logs**: Centralized logging and monitoring
- **AWS CloudTrail**: API call logging and auditing
- **Amazon GuardDuty**: Threat detection from logs
- **AWS Security Hub**: Centralized security findings

---

## Quick Reference Table

| Vulnerability | OWASP Category | Pattern | Fix |
|--------------|----------------|---------|-----|
| Hardcoded Secret | A02:2021 | `sk-[a-zA-Z0-9]+` | `import.meta.env.VITE_*` |
| XSS (dangerouslySetInnerHTML) | A03:2021 | `dangerouslySetInnerHTML` | Plain text `{variable}` or DOMPurify |
| Code Injection (eval) | A03:2021 | `eval\s*\(` | Remove eval, use safe alternatives |
| SQL Injection | A03:2021 | String concatenation in SQL | Parameterized queries |
| IDOR | A01:2021 | No auth checks | Add authorization checks |
| Missing Validation | A03:2021 | No validation comment | Add schema validation (zod, yup) |
| Insecure Deserialization | A08:2021 | `JSON.parse` without validation | Validate with schema |
| Insufficient Logging | A09:2021 | No logging comment | Add security event logging |

---

## Using MCP Tools for OWASP Knowledge

When users ask about OWASP vulnerabilities, use these MCP tools:

### Get OWASP Top 10 List
```
Use: get_owasp_top_10 tool
When: User asks "What are the OWASP Top 10?"
```

### Get Vulnerability Details
```
Use: get_vulnerability_details tool
When: User asks about specific vulnerability types
Types: injection, xss, hardcoded-secret, broken-access-control
```

### Get Corruption Level
```
Use: get_corruption_level tool
When: User asks "What is the current corruption level?"
```

---

## Educational Analogies

Use these fun analogies when explaining vulnerabilities:

- **Hardcoded Secrets**: "Like leaving your house key under the doormat - everyone knows to look there!"
- **XSS**: "Like inviting a vampire into your home - once they're in, chaos ensues! 🧛"
- **eval()**: "Like giving a stranger the keys to your car AND your house. Just... don't. 🚗🏠"
- **SQL Injection**: "Like letting someone write their own prescription at a pharmacy"
- **IDOR**: "Like a hotel giving out room keys without checking ID"
- **Missing Validation**: "Like accepting any package at your door without checking who sent it"

---

## Remember

- Always reference `security-lessons.md` for fun, educational explanations
- Always mention AWS services after fixes
- Use the exorcist personality from `exorcist-personality.md`
- Keep it educational, fun, and encouraging!
