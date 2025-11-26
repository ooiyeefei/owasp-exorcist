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

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:5173
```

## 🎬 The 3-Minute Demo Flow

| Time | Action |
|------|--------|
| 0:00 | Click "ENTER THE NIGHTMARE" - Audio drone starts |
| 0:30 | Ask Kiro: "What is the current corruption level?" |
| 1:00 | Kiro responds with 100% corruption and vulnerability list |
| 1:30 | Open `LeakyComponent.tsx`, ask Kiro to fix the secret |
| 2:00 | Save file → Hook triggers → UI heals → Audio shifts |
| 2:30 | Show final "Sanctified" state at 0% corruption |

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
