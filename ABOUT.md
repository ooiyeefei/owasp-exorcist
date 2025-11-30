# 🔮 The Digital Exorcism - Kiroween Hackathon 2025

> **A self-healing dashboard that teaches OWASP security through interactive gameplay**

## 🎃 The Concept

Your code is haunted. OWASP demons have possessed your React components, and only you (with Kiro's help) can perform the exorcism.

The Digital Exorcism is a meta-application where **Kiro is the game master**. It doesn't just help you play - it designs, builds, and orchestrates the entire experience in real-time. Kiro fetches current OWASP data, generates unique vulnerabilities, configures detection patterns, and guides you through fixes with educational content and AWS security recommendations.

**The game doesn't exist until you play it.** Every session is dynamically created by AI based on your skill level and current security standards.

---

## Consideration and Design

### 1. **Kiro as Game Master - AI Orchestrates Everything**

**This isn't just using Kiro - Kiro IS the game.** Every aspect is dynamically controlled by AI:

**🤖 Dynamic Game Generation**
- Fetches latest OWASP Top 10 via MCP at game start
- Understands user skill level (easy/hard mode)
- Generates 3-5 unique vulnerable components on the fly
- Configures detection patterns for auto-scanning
- Sets up AWS security recommendations per vulnerability

**🎯 Steering Documents** - AI personality & orchestration
- `game-commands.md` - Dynamic game flow and MCP integration
- `owasp-guide.md` - Security fix patterns with AWS services
- `exorcist-personality.md` - Witty, educational responses
- `security-lessons.md` - Bite-sized security education
- Located in `.kiro/steering/`

**🔄 Agent Hooks** - Self-modifying automation
- `start-game-dynamic.cjs` - Generates unique vulnerabilities each session
- `measure-corruption.cjs` - Uses dynamic detection patterns from session data
- `celebration-toast.cjs` - Victory celebrations at 0% corruption
- Hooks adapt to generated content automatically!
- Located in `.kiro/hooks/`

**🔌 MCP Integration** - Real-time OWASP data
- `get_owasp_top_10` - Fetches current vulnerability database
- `get_vulnerability_details` - Deep-dive education on specific types
- `get_corruption_level` - Reads game state in real-time
- Kiro uses these to stay current with security standards
- Located in `src/mcp/corruption-server.ts`

**📋 Specs** - Complete spec-driven development
- Requirements with EARS patterns and acceptance criteria
- Design with correctness properties for testing
- Task breakdown with implementation plan
- Located in `.kiro/specs/digital-exorcism/`

### 2. **Solves a Real Problem**

Security education is boring. We made it fun AND infinitely replayable.

- **Dynamic Generation**: Every session is unique - 8 OWASP templates, random selection
- **Interactive Learning**: Fix real vulnerabilities, see immediate results
- **AWS Security Education**: Learn which cloud services prevent each vulnerability
- **Gamification**: Corruption meter, demon metaphors, difficulty modes
- **Educational**: Each fix includes security lessons + real-world breach examples
- **Practical**: Uses actual OWASP Top 10 patterns with production-ready solutions

### 3. **Technical Innovation**

**AI Game Master Architecture**
- Kiro fetches OWASP data via MCP at runtime
- Generates unique vulnerable components dynamically
- Configures detection patterns on the fly
- Hooks adapt to generated content automatically
- No static game files - everything is created per session

**Kiro-Powered Workflow**
```bash
User: "start the game"
Kiro: [Fetches OWASP data via MCP]
Kiro: "Choose easy or hard mode?"
User: "easy"
Kiro: [Generates 3 unique vulnerabilities]
Kiro: [Configures detection patterns]
Kiro: [Starts server, provides link]
Kiro: "3 demons summoned! Open http://localhost:5173"

User: "fix the security vulnerability"  
Kiro: [Applies OWASP best practices]
Kiro: [Explains vulnerability + AWS solutions]
Kiro: [Runs measure hook with dynamic patterns]
Kiro: "Corruption dropped to 67%! 2 demons remain!"

User: "what is the current corruption level?"
Kiro: [Uses MCP tool to check]
Kiro: "67% - You're making progress! Keep going!"
```

**Self-Modifying System**
- Hooks use detection patterns from generated session data
- Measure script adapts to any vulnerability type
- No hardcoded patterns - everything is dynamic
- Infinite replayability with consistent detection

### 4. **User Experience**

**For Beginners:**
- Easy Mode: See all vulnerabilities
- Step-by-step guidance
- Clear instructions

**For Experts:**
- Hard Mode: Detective challenge
- Hints-only gameplay
- OWASP education

**For Everyone:**
- Witty, engaging personality
- Real-world impact stories
- Immediate visual feedback

---

## 🎮 How It Works

### The Kiro Way (3 Steps)

```bash
# 1. Clone and install
git clone https://github.com/ooiyeefei/owasp-exorcist.git
cd owasp-exorcist
npm install

# 2. Open in Kiro IDE and say:
"start the game"

# 3. Play!
# Kiro guides you through finding and fixing 3 OWASP vulnerabilities
```

### The Magic Behind It

**1. MCP Fetches Real-Time OWASP Data**
- `get_owasp_top_10` - Current vulnerability database
- `get_vulnerability_details` - Deep-dive education
- `get_corruption_level` - Game state monitoring
- Kiro stays current with latest security standards
- Implemented in `src/mcp/corruption-server.ts`

**2. Dynamic Generation Creates Unique Games**
- Selects 3-5 vulnerabilities from 8 OWASP templates
- Generates React components with real vulnerable code
- Creates detection patterns for auto-scanning
- Configures AWS security recommendations
- History tracking ensures variety across sessions
- Located in `.kiro/hooks/start-game-dynamic.cjs`

**3. Hooks Adapt to Generated Content**
- `measure-corruption.cjs` uses detection patterns from session data
- No hardcoded patterns - works with any vulnerability type
- Auto-scans on file save with dynamic detection
- Preserves original total for correct percentage math
- Configured in `.kiro/hooks/hooks.json`

**4. Steering Orchestrates the Experience**
- `game-commands.md` - Game flow with MCP integration
- `owasp-guide.md` - Security fixes + AWS services
- `exorcist-personality.md` - Witty, educational responses
- Kiro becomes "The Digital Exorcist" game master
- Defined in `.kiro/steering/`

**5. Specs Document the System**
- Complete requirements with acceptance criteria
- Design with correctness properties
- Task breakdown for implementation
- All in `.kiro/specs/digital-exorcism/`

---

## 🎯 Key Features

### 🎭 Visual Corruption Engine
Three states with dynamic styling:
- **Sanctified** (0-20%): Clean, peaceful UI
- **Possessed** (21-70%): Glitchy, unsettling
- **Damned** (71-100%): Full horror mode

### 🔊 Audio Feedback
WebAudio-based soundscape that shifts from dissonant drones to harmonic tones as you fix vulnerabilities.

### 🤖 AI-Powered Guidance
Kiro acts as your exorcist partner:
- Finds vulnerabilities
- Explains security concepts
- Applies fixes
- Teaches best practices

### 📚 Educational Content
Each fix includes:
- Quick security lesson
- Real-world breach examples
- Code before/after
- OWASP classification

### 🎮 Dual Difficulty Modes
- **Easy**: See all vulnerabilities (great for demos)
- **Hard**: Detective mode with hints only

---

## 🛠️ Technical Highlights

### Kiro Features Showcase

| Feature | How We Used It | Location |
|---------|---------------|----------|
| **Specs** | Complete spec-driven development | `.kiro/specs/digital-exorcism/` |
| **Steering** | AI personality & game orchestration | `.kiro/steering/*.md` |
| **Hooks** | Auto-scan on save, game initialization | `.kiro/hooks/*.cjs` |
| **MCP** | Custom corruption sensor + OWASP tools | `src/mcp/corruption-server.ts` |

### Architecture - Kiro as Game Master

```
User: "start the game"
         │
         ▼
┌─────────────────────────────────────────┐
│  Kiro (AI Game Master)                  │
├─────────────────────────────────────────┤
│  1. Fetches OWASP data via MCP          │
│  2. Asks difficulty preference          │
│  3. Generates unique vulnerabilities    │
│  4. Configures detection patterns       │
│  5. Starts server & guides gameplay     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Dynamic Generation System              │
├─────────────────────────────────────────┤
│  • 8 OWASP templates                    │
│  • Random selection (3-5 vulns)         │
│  • React component generation           │
│  • Detection pattern configuration      │
│  • AWS security recommendations         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Self-Modifying Hooks                   │
├─────────────────────────────────────────┤
│  • Use detection patterns from session  │
│  • Adapt to any vulnerability type      │
│  • Auto-scan on file save               │
│  • Update corruption in real-time       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  React Dashboard (Self-Healing UI)      │
├─────────────────────────────────────────┤
│  • Polls corruption-state.json          │
│  • Updates visuals/audio in real-time   │
│  • Shows vulnerabilities & progress     │
│  • Displays AWS security recommendations│
└─────────────────────────────────────────┘
```

### Innovation Points

1. **AI Game Master**: Kiro designs, builds, and orchestrates everything dynamically
2. **Dynamic Generation**: Unique vulnerabilities every session - infinite replayability
3. **Self-Modifying Hooks**: Detection patterns adapt to generated content automatically
4. **MCP Integration**: Real-time OWASP data fetching for current security standards
5. **AWS Education**: Learn production security with every fix
6. **Meta-Application**: App monitors its own code and heals in real-time
7. **One Command Start**: "start the game" triggers complete AI orchestration

---

## 📊 Impact & Learning

### What Users Learn

✅ **OWASP Top 10** - Industry-standard vulnerabilities  
✅ **Secure Coding** - Best practices for each fix  
✅ **Real-World Impact** - Actual breach examples  
✅ **Kiro Capabilities** - How to leverage AI for development  

### Real-World Examples Included

- **Uber**: $148M fine (exposed credentials)
- **British Airways**: $230M fine (XSS attack)  
- **Equifax**: 143M people affected (code execution)

---

## 🎯 Key Technical Achievements

### 1. **Dynamic Game Generation**
- 8 OWASP vulnerability templates
- Random selection ensures variety
- History tracking prevents repetition
- Generates React components on the fly
- Configures detection patterns automatically

### 2. **Self-Modifying Hooks**
- `measure-corruption.cjs` uses detection patterns from session data
- No hardcoded vulnerability patterns
- Adapts to any vulnerability type automatically
- Preserves original total for correct percentage math

### 3. **MCP Integration for Real-Time Data**
- Fetches current OWASP Top 10 at game start
- Provides deep-dive education on specific vulnerabilities
- Monitors game state in real-time
- Keeps content current with security standards

### 4. **AWS Security Education**
- Every vulnerability includes AWS service recommendations
- Practical use cases for Secrets Manager, WAF, CloudTrail, etc.
- Real-world breach examples (Equifax, British Airways, Uber)
- Direct links to AWS documentation

### 5. **Infinite Replayability**
- Thousands of possible vulnerability combinations
- Different code patterns each session
- Varied AWS recommendations
- Never the same game twice

## 🚀 Future Enhancements

The architecture supports easy expansion:

- **More Vulnerabilities**: Additional OWASP templates (CSRF, XXE, etc.)
- **Multiplayer Mode**: Compete to fix fastest
- **Leaderboards**: Track exorcism speed and accuracy
- **Custom Challenges**: User-created vulnerability sets
- **CI/CD Integration**: Run as security training in pipelines
- **Multi-Language Support**: Generate vulnerabilities in Python, Java, etc.

---

## 🏁 Conclusion

The Digital Exorcism isn't just a game - it's a **proof of concept** for AI as a game master:

✅ **MCP** fetches real-time OWASP data  
✅ **Dynamic Generation** creates unique challenges every session  
✅ **Self-Modifying Hooks** adapt to generated content automatically  
✅ **Steering** orchestrates the entire experience  
✅ **Specs** document the system  
✅ **Kiro** is the game master - designing, building, guiding in real-time  

**The Innovation:** The game doesn't exist until you play it. Kiro generates everything dynamically based on current security standards and your skill level.

**The Result:** An educational, infinitely replayable, and technically impressive demonstration of AI-powered development where the AI IS the game master.

**Key Insight:** We didn't just use Kiro to build a game - we made Kiro the game itself.

## 🎃 Happy Kiroween! 👻

Built with ❤️ using Kiro AI

**GitHub**: https://github.com/ooiyeefei/owasp-exorcist  
**Demo**: http://localhost:5173 (after `npm run dev`)
