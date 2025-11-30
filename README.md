# 🔮 The Digital Exorcism

> An AI-powered security training game that dynamically generates OWASP vulnerabilities and teaches you to fix them

**Kiroween Hackathon 2025 Entry**

## 🎃 The Concept

Your code is **haunted**. OWASP demons have possessed your React components, and only you (with Kiro's help) can perform the exorcism.

The Digital Exorcism is a meta-application that "haunts" itself based on the quality of its own source code. It visually and audibly degrades when insecure coding patterns are detected, and "sanctifies" (heals) itself in real-time as you use Kiro to fix the vulnerabilities.

### 🤖 Kiro: Your AI Game Master

**Kiro isn't just helping you play - Kiro IS the game.** Every session is dynamically orchestrated by AI:

- **🎲 Dynamic Generation**: Kiro fetches the latest OWASP data via MCP, understands your skill level (easy/hard), and generates unique vulnerable components on the spot
- **🏗️ Real-Time Design**: Each game is custom-built for you - different vulnerabilities, different code patterns, different learning paths
- **🧭 Live Guidance**: Kiro guides you through fixes, explains security concepts, and teaches AWS solutions in real-time
- **🔄 Instant Reset**: Want to play again? Kiro regenerates everything - new vulnerabilities, new challenges, infinite replayability
- **☁️ AWS Security Education**: Every vulnerability comes with practical AWS service recommendations and real-world breach examples

**The game master is AI. The game is code. The learning is real.**

## ✨ Features

### 🤖 Kiro as Game Master
**The entire game is orchestrated by AI in real-time:**
- **Dynamic Generation**: Kiro fetches latest OWASP data via MCP and generates unique vulnerabilities for each session
- **Adaptive Difficulty**: Understands your preference (easy/hard) and tailors the challenge accordingly
- **Live Configuration**: Generates code, sets up hooks, configures detection patterns - all on the fly
- **Real-Time Guidance**: Explains vulnerabilities, teaches fixes, and provides AWS security insights as you play
- **Instant Reset**: Say "start the game" and Kiro rebuilds everything from scratch with new challenges

### 🎲 Infinite Replayability
- **8 OWASP Templates**: Hardcoded secrets, XSS, SQL injection, IDOR, deserialization, and more
- **Unique Every Time**: 3-5 vulnerabilities randomly selected and generated per session
- **Smart Variety**: History tracking ensures you don't see the same patterns repeatedly
- **Two Difficulty Modes**: Easy (with hints) or Hard (detective challenge)

### ☁️ AWS Security Education
**Learn production-ready security with every fix:**
- **Service Recommendations**: Discover which AWS services prevent each vulnerability
- **Practical Use Cases**: See how to use Secrets Manager, WAF, CloudTrail, GuardDuty, etc.
- **Real-World Impact**: Learn from actual breach examples (Equifax, British Airways, etc.)
- **Documentation Links**: Direct access to AWS security service docs

### 🎭 Immersive Experience
- **Visual Corruption Engine**: Three states (Sanctified → Possessed → Damned) with glitch effects
- **Auditory Hallucinations**: WebAudio soundscape that shifts with corruption level
- **Real-Time Updates**: Watch corruption drop as you fix vulnerabilities
- **Exorcist Personality**: Kiro guides you with humor and horror metaphors

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Kiro IDE** ([Download here](https://kiro.ai))
- **Git**

### Getting Started (3 Easy Steps)

#### 1. Clone & Install
```bash
git clone https://github.com/ooiyeefei/owasp-exorcist.git
cd owasp-exorcist
npm install
```

#### 2. Open in Kiro IDE
- Open the `owasp-exorcist` folder in Kiro IDE
- Open Kiro Chat (sidebar or Cmd/Ctrl + L)

#### 3. Start Playing!

In Kiro Chat, simply type:
```
start the game
```

**That's it!** Kiro will:
1. Ask you to choose **Easy** or **Hard** mode
2. Generate 3-5 unique OWASP vulnerabilities
3. Start the dev server automatically
4. Guide you through the exorcism

Then open `http://localhost:5173` and watch the magic happen! ✨

## 🎮 How to Play

### 📖 Complete User Guide

<details>
<summary><strong>🚀 Starting Your First Game (Click to expand)</strong></summary>

#### Step 1: Talk to Kiro
Open Kiro Chat and type:
```
start the game
```

#### Step 2: Choose Difficulty
Kiro will ask:
> "🔮 Choose your difficulty: easy or hard?"

Reply with:
- `easy` - Get hints and guidance (recommended for first time)
- `hard` - Detective mode, find vulnerabilities yourself

#### Step 3: Open the Dashboard
Kiro will generate vulnerabilities and give you a link:
> "✅ 3 demons summoned!
> 
> 🌐 **Open this link in your browser:**
> 👉 http://localhost:5173"

**Click the link** or copy it to your browser!

#### Step 4: Confirm You're Ready
Tell Kiro:
```
I opened the link
```

Now you're ready to start fixing! 🎉

</details>

<details>
<summary><strong>🔍 Understanding the Dashboard (Click to expand)</strong></summary>

When you open http://localhost:5173, you'll see:

#### Top Section: Corruption Meter
```
┌─────────────────────────────────────┐
│ 👻 Corruption Level: 100%           │
│ [████████████████████] DAMNED       │
│ 🔄 Rescan Now                       │
└─────────────────────────────────────┘
```
- **100%** = All vulnerabilities present
- **0%** = All fixed! Victory! 🎉
- Click **🔄 Rescan Now** to force update

#### Middle Section: Vulnerability Cards
Each card shows:
```
┌─────────────────────────────────────┐
│ 📋 Hardcoded API Key                │
│                                     │
│ 🎯 HOW TO FIX THIS VULNERABILITY ⌄  │ ← Click to expand
│                                     │
│ [Test Input Field]                  │
│ [Test Submit Button]                │
│                                     │
│ ⚠️ High severity vulnerability!    │
│ 💡 Hint: Look for API_KEY          │
│                                     │
│ ☁️ AWS SECURITY SERVICES ⌄          │ ← Click to expand
└─────────────────────────────────────┘
```

#### Expandable Sections
Click the **⌄** arrows to:
- **How to Fix**: See step-by-step instructions
- **AWS Services**: Learn about cloud security solutions

</details>

<details>
<summary><strong>🛠️ Fixing Vulnerabilities (Click to expand)</strong></summary>

#### Method 1: Ask Kiro to Fix (Recommended)

1. **Open the vulnerable file** in Kiro IDE
   - Files are in `src/components/vulnerable/generated/`
   - Example: `VulnerableHardcodedAPIKey1.tsx`

2. **Ask Kiro to fix it**:
   ```
   fix the security vulnerability in this file
   ```

3. **Learn from Kiro's response**:
   - Kiro explains what was wrong
   - Shows the fix applied
   - Mentions AWS security services
   - Gives you a fun security lesson!

4. **Refresh your browser** to see corruption drop! 🎉

#### Method 2: Fix It Yourself

1. **Read the hints** in the dashboard
2. **Look at the code** in the vulnerable file
3. **Apply the fix** based on OWASP best practices
4. **Save the file** (Cmd/Ctrl + S)
5. **Refresh browser** to see progress!

#### Example Fix Flow

**Before (100% Corruption)**:
```typescript
// ❌ BAD: Hardcoded secret
const API_KEY = "sk-1234567890...";
```

**After Kiro Fixes (67% Corruption)**:
```typescript
// ✅ GOOD: Environment variable
const API_KEY = import.meta.env.VITE_API_KEY;
```

**Kiro's Response**:
> "🎉 Demon banished! Refresh your browser!
> 
> 🎓 Quick Lesson: Hardcoded secrets live FOREVER in git history!
> 
> ☁️ AWS Solution: Use AWS Secrets Manager to store and automatically
> rotate your API keys in production!
> 
> One demon down, 2 to go! You're on fire! 🔥"

</details>

<details>
<summary><strong>💡 Understanding the UI Elements (Click to expand)</strong></summary>

#### 🎯 "How to Fix" Section (Purple Box)
```
🎯 HOW TO FIX THIS VULNERABILITY ⌄

When expanded, shows:
1. Open this file in your code editor (Kiro IDE)
2. Look at the code - vulnerability is here
3. Ask Kiro: "Fix the security vulnerability"
4. Watch as corruption level drops!

💡 The input field below is just for testing!
```

**What it means**:
- The input field is **optional** - just for demo
- You **don't need to type anything** there to fix
- The real fix happens in the **code file**

#### ☁️ "AWS Security Services" Section (Orange Box)
```
☁️ AWS SECURITY SERVICES FOR THIS VULNERABILITY ⌄

When expanded, shows:
• Fun analogy explaining the vulnerability
• 3 AWS services that prevent this issue
• Use cases for each service
• Links to AWS documentation
• Real-world breach examples
```

**What it means**:
- Learn how to prevent this in **production**
- See which **AWS services** help
- Understand **real-world impact**
- Get links to **learn more**

#### Test Input Field
```
Test the vulnerability (optional):
[___________________________________]
[Test Submit]
```

**What it means**:
- This is **just for demonstration**
- Try entering malicious input to see the vulnerability
- Example: For XSS, try `<script>alert("XSS")</script>`
- **Not required** to fix the vulnerability!

</details>

<details>
<summary><strong>🎯 Difficulty Modes Explained (Click to expand)</strong></summary>

### 🟢 Easy Mode (Recommended for Learning)

**What you get**:
- ✅ **3 vulnerabilities** (manageable amount)
- ✅ **TODO hints** in the code files
- ✅ **Visible hints** on dashboard
- ✅ **OWASP categories** clearly labeled
- ✅ **Step-by-step guidance**

**Example hint in code**:
```typescript
// TODO: Look for variables named API_KEY, SECRET, TOKEN
// TODO: Check for long alphanumeric strings
// TODO: Search for strings starting with 'sk-', 'pk-'
```

**Example hint on dashboard**:
```
💡 Hint: Look for variables named API_KEY, SECRET, TOKEN, or PASSWORD
```

**Perfect for**:
- 🎯 First-time players
- 🎯 Learning OWASP concepts
- 🎯 Understanding security basics
- 🎯 Guided learning experience

---

### 🔴 Hard Mode (Detective Challenge)

**What you get**:
- ✅ **4-5 vulnerabilities** (more challenging)
- ❌ **No TODO hints** in code
- ❌ **No hints** on dashboard
- ✅ **OWASP categories** still shown
- ✅ **You hunt for the vulnerabilities**

**Example code** (no hints):
```typescript
// Just regular code - you find the vulnerability!
const API_KEY = "sk-1234567890...";
```

**Dashboard shows**:
```
⚠️ This component contains a high severity vulnerability!
(No hint - you figure it out!)
```

**Perfect for**:
- 🎯 Experienced developers
- 🎯 Security enthusiasts
- 🎯 Testing your skills
- 🎯 Realistic code review practice

---

### Switching Modes

Want to try the other mode? Just start a new game:
```
start the game
```
Then choose a different difficulty!

</details>

<details>
<summary><strong>🔄 Playing Multiple Sessions (Click to expand)</strong></summary>

### Why Play Again?

Each session generates **completely different vulnerabilities**!

**Session 1 might have**:
- Hardcoded API Key
- XSS via dangerouslySetInnerHTML
- SQL Injection

**Session 2 might have**:
- Code Injection (eval)
- IDOR
- Missing Input Validation
- Insecure Deserialization

### How to Start a New Game

1. **Finish your current game** (or don't - you can restart anytime!)

2. **Ask Kiro**:
   ```
   start the game
   ```

3. **Choose difficulty** again (can be different!)

4. **Get new vulnerabilities** - completely unique!

### History Tracking

The game remembers what you've seen:
- ✅ Avoids repeating recent vulnerabilities
- ✅ Ensures variety across sessions
- ✅ Tracks your learning progress

### Infinite Replayability

With **8 vulnerability templates** and **random selection**:
- 🎲 Thousands of possible combinations
- 🎲 Different code patterns each time
- 🎲 Varied AWS service recommendations
- 🎲 Never the same game twice!

</details>

### Starting a Session

**User**: "start the game"

**Kiro**: "🔮 Choose your difficulty: easy or hard?"

**User**: "easy"

**Kiro**: *Generates 3 unique vulnerabilities, starts server*

"✅ 3 demons summoned!

🌐 **Open this link in your browser:**
👉 http://localhost:5173

Have you opened the link? Let me know when you see the haunted dashboard!"

### Difficulty Modes

#### 🟢 Easy Mode (Recommended for Learning)
- **3 vulnerabilities** with TODO hints in code
- **Visible hints** on dashboard
- **OWASP categories** clearly labeled
- **Perfect for**: First-time players, learning security basics

#### 🔴 Hard Mode (Detective Challenge)
- **4-5 vulnerabilities** without hints
- **Realistic code** patterns
- **Minimal UI info** - you hunt for demons
- **Perfect for**: Experienced developers, security enthusiasts

### Fixing Vulnerabilities

1. **Open a generated file** in `src/components/vulnerable/generated/`
2. **Ask Kiro**: "fix the security vulnerability in this file"
3. **Learn**: Kiro explains the vulnerability + AWS solutions
4. **Save**: File saves automatically
5. **Watch**: Corruption drops in real-time!

### Example Fix Response

```
🎉 Demon banished! Refresh your browser!

🎓 Quick Lesson: Hardcoded secrets are like leaving your house 
key under the doormat - everyone knows to look there!

☁️ AWS Solution:
• AWS Secrets Manager: Automatically rotate and manage secrets
  Use Case: Store API keys in Secrets Manager, retrieve at runtime
  
• AWS Systems Manager Parameter Store: Centralized config storage
  Use Case: Store secrets with KMS encryption, free for standard params

📚 Learn More: https://aws.amazon.com/secrets-manager/

One demon down, 2 to go! You're on fire! 🔥
```

### Useful Commands

**In Kiro Chat:**
- `"start the game"` - Begin new session
- `"fix this"` - Fix current file's vulnerability
- `"what is the current corruption level?"` - Check progress
- `"what are the OWASP Top 10?"` - Learn about vulnerabilities
- `"tell me about XSS"` - Deep dive into specific vulnerability
- `"scan the generated folder"` - Find all vulnerabilities

**In Browser:**
- Click **🔄 Rescan Now** to force corruption update
- Toggle **Easy/Hard** to see different hint levels
- Watch the **corruption meter** drop as you fix issues

## 🎯 What You'll Learn

### OWASP Security Concepts
- **A01:2021** - Broken Access Control (IDOR)
- **A02:2021** - Cryptographic Failures (Hardcoded Secrets)
- **A03:2021** - Injection (XSS, SQL Injection, Code Injection)
- **A04:2021** - Insecure Design (Missing Validation)
- **A08:2021** - Software and Data Integrity Failures (Deserialization)
- **A09:2021** - Security Logging Failures

### AWS Security Services
- **AWS Secrets Manager** - Secure secret storage and rotation
- **AWS WAF** - Web application firewall for XSS/SQL injection
- **AWS CloudTrail** - Audit logging and compliance
- **AWS IAM** - Access control and permissions
- **Amazon GuardDuty** - Threat detection
- **Amazon Inspector** - Vulnerability scanning
- **AWS KMS** - Encryption key management
- **Amazon CloudWatch** - Monitoring and alerting

### Real-World Skills
- Identifying security vulnerabilities in code
- Understanding OWASP Top 10 patterns
- Applying secure coding practices
- Using AWS services for production security
- Reading and understanding security documentation


## � How thte Dynamic Game Works

**Kiro orchestrates everything in real-time:**

```
User: "start the game"
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  1. Kiro fetches latest OWASP data via MCP                  │
│     • Gets current Top 10 vulnerabilities                    │
│     • Understands security patterns and fixes                │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Kiro asks: "Easy or Hard mode?"                         │
│     • Easy: 3 vulnerabilities with hints                     │
│     • Hard: 4-5 vulnerabilities, detective mode              │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Kiro generates unique vulnerable components              │
│     • Selects from 8 OWASP templates                         │
│     • Creates React components with real vulnerabilities     │
│     • Configures detection patterns for auto-scanning        │
│     • Sets up AWS security recommendations                   │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Game is live! Kiro guides you through fixes             │
│     • Explains each vulnerability as you encounter it        │
│     • Teaches OWASP concepts with real-world examples        │
│     • Shows AWS services that prevent each issue             │
│     • Measures corruption in real-time as you fix            │
└─────────────────────────────────────────────────────────────┘
```

**Key Innovation**: The game doesn't exist until you play it. Kiro builds, configures, and guides everything dynamically based on current OWASP standards and your skill level.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Kiro IDE Environment                     │
│  Kiro fixes vulnerability → Auto-saves → Runs hook          │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  The Ritual (Agent Hook) - .kiro/hooks/measure-corruption.js │
│  Scans code → Calculates corruption → Writes JSON           │
└───────────────────┬──────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────────┐   ┌───────────────────┐
│ React Frontend    │   │ MCP Server        │
│ (Visuals + Audio) │   │ (Corruption       │
│                   │   │  Sensor)          │
└───────────────────┘   └───────────────────┘
```

## 📁 Kiro Integration Points

```
.kiro/
├── hooks/
│   ├── hooks.json           # Hook configuration
│   └── measure-corruption.js # The Ritual scanner
├── settings/
│   └── mcp.json             # MCP server config
├── steering/
│   └── owasp-guide.md       # The Exorcism Rules
└── specs/
    └── digital-exorcism/    # This project's spec
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

## 🪝 Kiro Agent Hooks

Four automated hooks that showcase Kiro's workflow automation:

| Hook | Trigger | Status | Purpose |
|------|---------|--------|---------|
| 🔮 **The Ritual** | File Save | ✅ Enabled | Scans for OWASP vulnerabilities |
| 📝 **Sanctification Recorder** | File Save | ⏸️ Optional | Auto-commits security fixes |
| 🎉 **Victory Chime** | File Save | ✅ Enabled | Celebrates 0% corruption |
| 📚 **Grimoire Scribe** | File Save | ⏸️ Optional | Auto-generates security docs |

See [`.kiro/hooks/README.md`](.kiro/hooks/README.md) for detailed documentation.

## 🔒 Vulnerability Templates

The game includes **8 OWASP vulnerability templates** that generate unique challenges:

| Template | OWASP Category | AWS Solution | Severity |
|----------|----------------|--------------|----------|
| Hardcoded Secrets | A02:2021 | Secrets Manager, Parameter Store | High |
| XSS (dangerouslySetInnerHTML) | A03:2021 | WAF, CloudFront CSP | High |
| Code Injection (eval) | A03:2021 | Lambda isolation, IAM | Critical |
| SQL Injection | A03:2021 | WAF, RDS with IAM auth | Critical |
| IDOR | A01:2021 | IAM, Cognito | High |
| Missing Input Validation | A04:2021 | WAF, API Gateway | Medium |
| Insecure Deserialization | A08:2021 | Lambda, API Gateway | High |
| Insufficient Logging | A09:2021 | CloudTrail, CloudWatch | Medium |

Each template includes:
- ✅ Vulnerable code pattern
- ✅ Fix pattern
- ✅ Educational content with analogies
- ✅ Real-world breach examples
- ✅ AWS service recommendations
- ✅ Documentation links

## 🔄 Play Again

Want a new challenge? Just say:
```
start the game
```

Kiro will generate a **completely different set** of vulnerabilities! The game tracks your history to ensure variety across sessions.

### Why Dynamic Generation?

**Before (Static)**:
- Same 3 vulnerabilities every time
- Limited learning opportunities
- Predictable patterns

**After (Dynamic)**:
- Unique vulnerabilities each session
- 8 different OWASP types
- Infinite replayability
- Varied difficulty

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all unit tests
npm test

# Run system integration test
bash scripts/test-dynamic-generation.sh
```

**Test Coverage**: 39 passing tests covering template validation, history tracking, and vulnerability selection.

## 🎨 Visual States

| Corruption | State | Visual Effects |
|------------|-------|----------------|
| 0-20% | Sanctified | Glassmorphism, blue gradients, smooth animations |
| 21-70% | Possessed | Jitter, chromatic aberration, flickering |
| 71-100% | Damned | Screen tearing, red overlay, Zalgo text |

## 🔊 Audio States

| Corruption | Sound |
|------------|-------|
| > 50% | Low-frequency sawtooth wave (dissonant, unsettling) |
| ≤ 50% | Sine wave major chord (harmonic, angelic) |

## 🐛 Troubleshooting

<details>
<summary><strong>❓ Common Questions & Issues (Click to expand)</strong></summary>

### Q: The localhost link doesn't work!

**A**: Check if the dev server is running:
```bash
# Check if server is running
lsof -ti:5173

# If nothing shows, start it manually
npm run dev
```

Then try http://localhost:5173 again!

---

### Q: I fixed a vulnerability but corruption didn't drop!

**A**: Try these steps:
1. **Click 🔄 Rescan Now** button in the dashboard
2. **Refresh the page** (Cmd/Ctrl + R)
3. **Check the file saved** - look for green checkmark in Kiro
4. **Ask Kiro**: "what is the current corruption level?"

---

### Q: I don't see any vulnerabilities on the dashboard!

**A**: The components might not have loaded:
1. **Check the browser console** (F12) for errors
2. **Regenerate components**:
   ```
   In Kiro Chat: "start the game"
   ```
3. **Refresh browser** after regeneration

---

### Q: What should I type in the input fields?

**A**: **Nothing!** The input fields are optional for testing:
- They demonstrate how the vulnerability works
- You can try malicious input to see the issue
- **But you don't need them to fix the vulnerability**
- The real fix happens in the code file

---

### Q: Where are the vulnerable files?

**A**: Look in:
```
src/components/vulnerable/generated/
```

Files are named like:
- `VulnerableHardcodedAPIKey1.tsx`
- `VulnerableXSSviadangerouslySetInnerHTML2.tsx`
- `VulnerableSQLInjection3.tsx`

---

### Q: How do I know which file to fix?

**A**: The dashboard shows the component name:
```
📋 Hardcoded API Key
```

Look for a file with "HardcodedAPIKey" in the name!

Or ask Kiro:
```
scan the generated folder for vulnerabilities
```

---

### Q: Can I fix vulnerabilities manually?

**A**: Yes! You can:
1. **Read the hints** on the dashboard
2. **Look at the code** in the file
3. **Apply the fix** yourself
4. **Save the file** (Cmd/Ctrl + S)
5. **Refresh browser** to see progress

But asking Kiro is easier and more educational! 😊

---

### Q: The game is too easy/hard!

**A**: Start a new game with different difficulty:
```
start the game
```

Then choose:
- `easy` - Get hints and guidance
- `hard` - Detective mode, no hints

---

### Q: I want to play again with new vulnerabilities!

**A**: Just say:
```
start the game
```

Kiro will generate completely different vulnerabilities!

---

### Q: What are the expandable sections (⌄)?

**A**: Click the **⌄** arrows to expand/collapse:
- **🎯 How to Fix** - Step-by-step instructions
- **☁️ AWS Services** - Cloud security solutions

This keeps the UI clean while giving you details when needed!

---

### Q: Do I need to use AWS to play?

**A**: **No!** The AWS information is educational:
- Learn which services prevent vulnerabilities
- Understand production security
- Get links to documentation
- **Not required** to play the game

---

### Q: How do I reset everything?

**A**: Clean up and start fresh:
```bash
# Remove generated components
rm -rf src/components/vulnerable/generated/*

# Start new game
In Kiro Chat: "start the game"
```

---

### Q: The corruption level is stuck at 100%!

**A**: Make sure you:
1. **Actually fixed** the vulnerability (not just viewed it)
2. **Saved the file** (Cmd/Ctrl + S)
3. **Clicked 🔄 Rescan Now** or refreshed browser
4. **Check Kiro's response** - did it say "Exorcism complete"?

---

### Q: Can I see all vulnerabilities at once?

**A**: Ask Kiro:
```
scan the generated folder
```

Or check the dashboard - all vulnerabilities are listed!

---

### Q: What if I get an error?

**A**: Common fixes:
1. **Restart dev server**: Stop (Ctrl+C) and run `npm run dev`
2. **Clear browser cache**: Hard refresh (Cmd/Ctrl + Shift + R)
3. **Reinstall dependencies**: `npm install`
4. **Check Node version**: Should be v18 or higher

Still stuck? Check the browser console (F12) for error messages!

</details>

### Quick Fixes

**Components Not Loading?**
```
In Kiro Chat: "start the game"
Then refresh browser
```

**Corruption Not Updating?**
- Click **🔄 Rescan Now** button
- Or refresh page (Cmd/Ctrl + R)

**Want to Reset?**
```bash
rm -rf src/components/vulnerable/generated/*
```
Then start a new game!

## 📚 Documentation

- **[DYNAMIC_GENERATION.md](DYNAMIC_GENERATION.md)** - Technical architecture and implementation details
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Complete workflow documentation
- **[.kiro/hooks/README.md](.kiro/hooks/README.md)** - Agent hooks documentation
- **[.kiro/templates/vulnerabilities/README.md](.kiro/templates/vulnerabilities/README.md)** - Template format guide

## 🎓 Educational Value

This project teaches:
- ✅ **OWASP Top 10** vulnerabilities with hands-on practice
- ✅ **AWS Security Services** and their practical applications
- ✅ **Secure Coding Practices** for production environments
- ✅ **Real-World Impact** of security vulnerabilities
- ✅ **Detection Skills** for finding vulnerabilities in code

Perfect for:
- 🎯 Security beginners learning OWASP concepts
- 🎯 Developers wanting to understand AWS security
- 🎯 Teams doing security training
- 🎯 Anyone interested in secure coding practices

## 🏆 Hackathon Features

Built for **Kiroween Hackathon 2025**, showcasing:

1. **Agent Hooks** - Automatic code scanning on file save
2. **MCP Integration** - Corruption Sensor and OWASP data tools
3. **Steering Documents** - AI guidance for security fixes
4. **Dynamic Generation** - Infinite replayability with unique challenges
5. **Educational Content** - Real-world security lessons with AWS solutions

## 🤝 Contributing

Want to add more vulnerability templates? Check out `.kiro/templates/vulnerabilities/README.md` for the template format!

## 📜 License

MIT - Built for Kiroween Hackathon 2025

## 🙏 Acknowledgments

- **OWASP** for security vulnerability classifications
- **AWS** for security service documentation
- **Kiro** for the amazing AI-powered IDE
- **You** for learning security! 🎉

---

*"Your code is haunted. Only Kiro can save it."* 👻

**Ready to play?** Just say "start the game" to Kiro! 🔮
