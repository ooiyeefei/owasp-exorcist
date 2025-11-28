# 🔮 The Digital Exorcism - Kiroween Hackathon 2025

> **A self-healing dashboard that teaches OWASP security through interactive gameplay**

## 🎃 The Concept

Your code is haunted. OWASP demons have possessed your React components, and only you (with Kiro's help) can perform the exorcism.

The Digital Exorcism is a meta-application that monitors its own source code for security vulnerabilities and responds with visual/audio degradation. As you use Kiro to fix vulnerabilities, the app "heals" itself in real-time - demonstrating Kiro's power as an AI development partner.

---

## 🏆 Why This Wins

### 1. **Showcases ALL Kiro Features**

We didn't just use Kiro - we built an experience that demonstrates its full ecosystem:

**📋 Specs** - Complete spec-driven development
- Requirements with EARS patterns
- Design with correctness properties  
- Task breakdown with implementation plan
- Located in `.kiro/specs/digital-exorcism/`

**🎯 Steering Documents** - AI personality & guidance
- `exorcist-personality.md` - Witty, Halloween-themed responses
- `game-commands.md` - Game flow orchestration
- `owasp-guide.md` - Security fix patterns
- `security-lessons.md` - Educational content
- Located in `.kiro/steering/`

**🔄 Agent Hooks** - Automated workflows
- `measure-corruption.cjs` - Auto-scans code on file save
- `start-game.cjs` - One-command game initialization
- `celebration-toast.cjs` - Victory celebrations
- Located in `.kiro/hooks/`

**🔌 MCP Integration** - Custom tools
- `corruption-sensor` - Reads spiritual health of code
- `get_owasp_top_10` - Fetches vulnerability database
- `get_vulnerability_details` - Deep-dive education
- Located in `src/mcp/corruption-server.ts`

### 2. **Solves a Real Problem**

Security education is boring. We made it fun.

- **Interactive learning**: Fix real vulnerabilities, see immediate results
- **Gamification**: Corruption meter, demon metaphors, difficulty modes
- **Educational**: Each fix includes bite-sized security lessons
- **Practical**: Uses actual OWASP Top 10 patterns

### 3. **Technical Innovation**

**Meta-Application Design**
- App monitors its own source code
- Real-time visual/audio feedback based on code quality
- Self-healing UI that responds to fixes

**Kiro-Powered Workflow**
```bash
User: "start the game"
Kiro: [Resets vulnerabilities, starts server, guides gameplay]

User: "fix the security vulnerability"  
Kiro: [Applies OWASP best practices, explains why, celebrates]

User: "what is the current corruption level?"
Kiro: [Uses MCP tool to check, reports status]
```

**Smart Architecture**
- Hook-based automation (no manual scripts!)
- MCP tools for extensibility
- Steering for personality
- Specs for documentation

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

**1. Specs Drive Development**
- Complete requirements with acceptance criteria
- Design with correctness properties
- Task breakdown for implementation
- All in `.kiro/specs/digital-exorcism/`

**2. Steering Shapes Personality**
- Kiro becomes "The Digital Exorcist"
- Witty, Halloween-themed responses
- Educational security lessons
- Defined in `.kiro/steering/`

**3. Hooks Automate Workflows**
- File save → Auto-scan for vulnerabilities
- Game start → Reset & initialize
- Victory → Celebration
- Configured in `.kiro/hooks/hooks.json`

**4. MCP Extends Capabilities**
- Custom corruption sensor tool
- OWASP knowledge base
- Vulnerability deep-dives
- Implemented in `src/mcp/corruption-server.ts`

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

### Architecture

```
┌─────────────────────────────────────────┐
│  Kiro IDE (AI Development Partner)     │
├─────────────────────────────────────────┤
│  • Specs: Requirements → Design → Tasks│
│  • Steering: Personality & Guidance    │
│  • Hooks: Automated Workflows          │
│  • MCP: Custom Tools                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  React Dashboard (Self-Healing UI)     │
├─────────────────────────────────────────┤
│  • Polls corruption-state.json         │
│  • Updates visuals/audio in real-time  │
│  • Shows vulnerabilities & progress    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Vulnerable Components (The Demons)    │
├─────────────────────────────────────────┤
│  • Hardcoded secrets                   │
│  • XSS vulnerabilities                 │
│  • Code execution risks                │
└─────────────────────────────────────────┘
```

### Innovation Points

1. **Meta-Application**: App monitors its own code
2. **Kiro Orchestration**: One command starts everything
3. **Educational Gaming**: Learn security through play
4. **Real-time Feedback**: See fixes take effect immediately
5. **Extensible**: Easy to add more vulnerabilities/modes

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

## 🚀 Future Enhancements

The architecture supports easy expansion:

- **More Vulnerabilities**: SQL injection, CSRF, etc.
- **Multiplayer Mode**: Compete to fix fastest
- **Leaderboards**: Track exorcism speed
- **Custom Challenges**: User-created vulnerability sets
- **CI/CD Integration**: Run as security training in pipelines

---

## 🏁 Conclusion

The Digital Exorcism isn't just a game - it's a **proof of concept** for how Kiro transforms development:

✅ **Specs** guide the build  
✅ **Steering** shapes the experience  
✅ **Hooks** automate the workflow  
✅ **MCP** extends capabilities  
✅ **AI** partners with developers  

We didn't just use Kiro's features - we showcased how they work together to create something impossible to build alone.

**The result?** An educational, entertaining, and technically impressive demonstration of AI-powered development.

## 🎃 Happy Kiroween! 👻

Built with ❤️ using Kiro AI

**GitHub**: https://github.com/ooiyeefei/owasp-exorcist  
**Demo**: http://localhost:5173 (after `npm run dev`)
