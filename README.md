# 🔮 The Digital Exorcism

> A self-healing dashboard that monitors its own source code for OWASP security vulnerabilities

**Kiroween Hackathon 2025 Entry**

## 🎃 The Concept

Your code is **haunted**. OWASP demons have possessed your React components, and only you (with Kiro's help) can perform the exorcism.

The Digital Exorcism is a meta-application that "haunts" itself based on the quality of its own source code. It visually and audibly degrades when insecure coding patterns are detected, and "sanctifies" (heals) itself in real-time as you use Kiro to fix the vulnerabilities.

## ✨ Features

- **🎭 Visual Corruption Engine**: Three visual states (Sanctified → Possessed → Damned) with glassmorphism, glitch effects, and screen tearing
- **🔊 Auditory Hallucinations**: WebAudio-based soundscape that shifts from dissonant drones to harmonic tones
- **🔍 The Ritual (Agent Hook)**: Automatic code scanning that detects OWASP vulnerabilities on file save
- **🤖 MCP Integration**: Kiro can "sense" the corruption level via the Corruption Sensor tool
- **📜 Steering Documents**: AI guidance for fixing specific vulnerability patterns

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Kiro IDE** ([Download here](https://kiro.ai))
- **Git**

### Getting Started (3 Steps)

**1. Clone & Install**
```bash
git clone https://github.com/ooiyeefei/owasp-exorcist.git
cd owasp-exorcist
npm install
```

**2. Open in Kiro IDE**
- Open the `owasp-exorcist` folder in Kiro IDE
- Open Kiro Chat (sidebar)

**3. Start Playing!**

In Kiro Chat, type:
```
start the game
```

Kiro will:
- ✅ Reset the game to haunted state (100% corruption)
- ✅ Start the dev server automatically
- ✅ Guide you through the gameplay

Then open **http://localhost:5173** in your browser and start fixing vulnerabilities!

### How to Play

**In Kiro Chat:**
- `"start the game"` - Initialize the game
- `"fix the security vulnerability"` - Fix the current file
- `"what is the current corruption level?"` - Check progress
- `"what are the OWASP Top 10?"` - Learn about vulnerabilities

**In the Browser:**
- Choose Easy or Hard difficulty
- Watch the corruption meter
- See vulnerabilities get fixed in real-time

### Need Help?


## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Kiro IDE Environment                     │
│  User edits vulnerable/*.tsx → File Save Event              │
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

## 🔒 The Haunted Codebase

Three intentionally vulnerable components in `src/components/vulnerable/`:

| Component | Vulnerability | OWASP Category |
|-----------|--------------|----------------|
| `LeakyComponent.tsx` | Hardcoded API key | Sensitive Data Exposure |
| `InjectionComponent.tsx` | `dangerouslySetInnerHTML` | Prompt Injection |
| `UnsafeComponent.tsx` | `eval()` | XSS / Insecure Output |

## 🛠️ Demo Reset

To reset the demo to its fully haunted state:

```bash
./scripts/reset-demo.sh
```

This will:
1. Restore vulnerable components via `git checkout`
2. Reset `corruption-state.json` to 100%

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

## 📜 License

MIT - Built for Kiroween Hackathon 2025

---

*"Your code is haunted. Only Kiro can save it."* 👻
