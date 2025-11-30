# Vulnerability Template Checklist

Use this checklist when creating or modifying vulnerability templates to avoid pattern contamination issues.

---

## ✅ Pre-Submission Checklist

### 1. Template Name
- [ ] Uses generic, descriptive terms
- [ ] Does NOT contain the vulnerable pattern
- [ ] Example: "Code Injection Vulnerability" not "Code Injection via eval()"

### 2. Hints (Easy & Hard)
- [ ] Describe what to look for without using exact pattern
- [ ] Use generic terminology
- [ ] Example: "Search for dynamic code execution" not "Search for 'eval('"

### 3. Educational Content
- [ ] Analogy uses alternative phrasing
- [ ] Prevention tip avoids exact pattern
- [ ] Real-world impact doesn't mention pattern in quotes

### 4. AWS Services
- [ ] Descriptions use generic terms
- [ ] Use cases avoid exact pattern
- [ ] Focus on what the service does, not the specific vulnerability syntax

### 5. Detection Pattern
- [ ] Pattern is specific enough to catch vulnerability
- [ ] Pattern won't match display text
- [ ] Fix indicators are clear and testable

### 6. Testing
- [ ] Generated component from template
- [ ] Verified detection works (shows as vulnerable)
- [ ] Applied fix from template
- [ ] Verified fix detection works (shows as fixed)
- [ ] No validation warnings when loading template

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T
```json
{
  "name": "XSS via dangerouslySetInnerHTML",
  "hints": {
    "easy": ["Look for 'dangerouslySetInnerHTML' in code"]
  },
  "educationalContent": {
    "analogy": "Using dangerouslySetInnerHTML is like..."
  }
}
```

### ✅ DO
```json
{
  "name": "XSS Vulnerability",
  "hints": {
    "easy": ["Look for unsafe HTML rendering in code"]
  },
  "educationalContent": {
    "analogy": "Unsafe HTML rendering is like..."
  }
}
```

---

## 📋 Pattern Naming Quick Reference

| Vulnerable Code | Template Name | Hint Phrasing |
|----------------|---------------|---------------|
| `eval()` | "Code Injection Vulnerability" | "dynamic code execution" |
| `dangerouslySetInnerHTML` | "XSS Vulnerability" | "unsafe HTML rendering" |
| `${userId}` in SQL | "SQL Injection" | "string concatenation in queries" |
| `API_KEY = "sk-..."` | "Hardcoded Secret" | "hardcoded credentials" |
| No validation | "Missing Input Validation" | "unvalidated user input" |
| No logging | "Insufficient Logging" | "missing security logs" |

---

## 🧪 Testing Commands

### 1. Generate Game with Your Template
```bash
node .kiro/hooks/start-game-dynamic.cjs easy
```
**Check for:** Validation warnings in console

### 2. Test Detection
```bash
node .kiro/hooks/measure-corruption.cjs
```
**Expected:** Shows as vulnerable

### 3. Apply Fix
Edit the generated file with your fix pattern

### 4. Test Fix Detection
```bash
node .kiro/hooks/measure-corruption.cjs
```
**Expected:** Shows as fixed

---

## 📖 Full Documentation

For detailed guidelines, see:
- **Design Rules:** `.kiro/steering/vulnerability-template-rules.md`
- **Technical Details:** `.kiro/docs/pattern-contamination-fix.md`
- **Implementation Summary:** `.kiro/docs/IMPROVEMENTS_SUMMARY.md`

---

## 🆘 Need Help?

### If validation warnings appear:
1. Check template name - use generic terms
2. Check hints - avoid exact patterns
3. Check educational content - rephrase to avoid pattern
4. See examples in existing templates

### If detection doesn't work:
1. Verify pattern matches actual vulnerable code
2. Check that pattern doesn't match display text
3. Test with generated component
4. Add fix indicators if needed

### If fix detection fails:
1. Verify fix indicators are present in fixed code
2. Check that vulnerable pattern is removed
3. Test manually with measure-corruption hook
4. Review detection type (regex vs string vs comment)

---

**Remember:** Generic display text + Specific detection patterns = Reliable game experience

---

**Last Updated:** 2024-11-30  
**Version:** 1.0
