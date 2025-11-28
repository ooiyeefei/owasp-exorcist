# 🚀 Getting Started: The Digital Exorcism

**Complete beginner's guide - no prior knowledge required!**

> **Quick Start**: Just want to play? See the [3-step guide in README.md](README.md#-quick-start)

---

## 📋 What You'll Need

- A computer with macOS, Windows, or Linux
- Internet connection
- About 10 minutes

---

## Step 1: Install Prerequisites

### Install Node.js (if you don't have it)

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from: https://nodejs.org/
```

**Windows:**
- Download from: https://nodejs.org/
- Run the installer
- Accept all defaults

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

**Verify installation:**
```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

---

## Step 2: Get the Code

### Option A: Clone from GitHub (if you have git)
```bash
# Navigate to where you want the project
cd ~/Documents

# Clone the repository
git clone https://github.com/ooiyeefei/owasp-exorcist.git

# Enter the project directory
cd owasp-exorcist
```

### Option B: Download ZIP (if you don't have git)
1. Go to: https://github.com/ooiyeefei/owasp-exorcist
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file
5. Open Terminal/Command Prompt
6. Navigate to the extracted folder:
   ```bash
   cd path/to/owasp-exorcist
   ```

---

## Step 3: Install Dependencies

This downloads all the code libraries the project needs:

```bash
npm install
```

**What you'll see:**
- Lots of text scrolling by
- Progress bars
- Takes 1-2 minutes
- Should end with "added XXX packages"

**If you see errors:**
- Make sure you're in the project directory
- Try: `npm install --legacy-peer-deps`
- Check your internet connection

---

## Step 4: Open in Kiro IDE

1. Launch Kiro IDE
2. **File → Open Folder** → Select the `owasp-exorcist` folder
3. Open **Kiro Chat** (look for the chat icon in the sidebar)

## Step 5: Start the Game

In Kiro Chat, type:
```
start the game
```

**Kiro will respond:**
```
🔮 Time to perform some digital exorcism!
✅ Game is ready!
📱 Open http://localhost:5173
```

**What Kiro does automatically:**
- Resets the game to haunted state (100% corruption)
- Starts the dev server
- Prepares the game for play

---

## Step 6: Open the Dashboard

Open your browser and go to:
```
http://localhost:5173
```

**You should see:**
- The haunted dashboard at 100% corruption
- Spooky visuals and audio
- 3 vulnerabilities listed
- Difficulty toggle (Easy/Hard)

---

## Step 6: Open the App in Your Browser

1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Go to: **http://localhost:5173**
3. You should see a dark screen with "ENTER THE NIGHTMARE" button

**If the page doesn't load:**
- Check the terminal - is the server still running?
- Try: http://localhost:5174 (sometimes Vite uses a different port)
- Look at the terminal output for the correct URL

---

## Step 7: Experience the Exorcism!

### 7.1 Enter the Nightmare
1. Click the **"ENTER THE NIGHTMARE"** button
2. You'll hear spooky Halloween background music
3. The UI will look corrupted with red effects

### 7.2 Check the Corruption Level
- Look at the top of the page
- You should see: **"Corruption Level: 100%"**
- Three vulnerabilities listed below

### 7.3 Open Kiro IDE (if you have it)
If you have Kiro IDE installed:
1. Open Kiro
2. Open this project folder
3. In Kiro Chat, ask: **"What is the current corruption level?"**
4. Kiro will respond with the corruption status using MCP

### 7.4 Fix Your First Vulnerability

**Open the file:**
- In your code editor, open: `src/components/vulnerable/LeakyComponent.tsx`

**Find the vulnerability:**
```typescript
// Line 10 - This is the problem!
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz1234567890";
```

**Ask Kiro to fix it:**
- In Kiro Chat, ask: "Fix the security vulnerability in this file"
- Kiro will automatically:
  - Apply the fix
  - Save the file
  - Run the corruption scanner
  ```typescript
  const API_KEY = import.meta.env.VITE_API_KEY || "API_KEY_NOT_SET";
  ```

### 7.5 Watch the Magic! ✨

**What Kiro does automatically:**
1. Applies the security fix
2. Saves the file
3. Runs the corruption scanner hook
4. Updates the corruption state

**What you see:**
1. Corruption level drops from 100% → 67%
2. Visual effects reduce (less red, less glitchy)
3. Music begins crossfading (becomes less ominous)
4. The UI starts healing!

**Check the terminal:**
```
Corruption level: 67%
Vulnerabilities found: 2
```

### 7.6 Fix the Remaining Vulnerabilities

**Vulnerability 2: InjectionComponent.tsx**
- Open: `src/components/vulnerable/InjectionComponent.tsx`
- Ask Kiro: "Fix the security vulnerability in this file"
- Kiro automatically fixes, saves, and updates corruption → 34%

**Vulnerability 3: UnsafeComponent.tsx**
- Open: `src/components/vulnerable/UnsafeComponent.tsx`
- Ask Kiro: "Fix the security vulnerability in this file"
- Kiro automatically fixes, saves, and updates corruption → 0%!

### 7.7 Celebrate! 🎉

When corruption reaches 0%:
- The UI becomes beautiful (blue/purple gradients)
- Music crossfades to peaceful, angelic ambient
- Terminal shows celebration message:
  ```
  ═══════════════════════════════════════════════════════
                    🎉 SANCTIFICATION COMPLETE! 🎉        
  ═══════════════════════════════════════════════════════
  ```

---

## Step 8: Reset for Another Demo

Want to do it again? Easy!

1. **Stop the server** (if needed):
   - Go to the terminal
   - Press `Ctrl + C`

2. **Reset the game:**
   In Kiro Chat: `"start the game"`

3. **Start the server again:**
   ```bash
   npm run dev
   ```

4. **Refresh your browser**
   - Press `F5` or `Cmd + R`
   - You're back to 100% corruption!

---

## 🎯 Quick Command Reference

```bash
# Install dependencies (first time only)
npm install

# Reset to haunted state
./scripts/reset-demo.sh

# Start the app
npm run dev

# Stop the app
# Press Ctrl + C in the terminal

# Test The Ritual hook manually
node .kiro/hooks/measure-corruption.cjs

# Test Victory Chime manually
node .kiro/hooks/celebration-toast.cjs
```

---

## 🐛 Common Issues & Solutions

### "Command not found: npm"
**Solution:** Install Node.js (see Step 1)

### "Permission denied" when running reset script
**Solution:**
Make sure you're in Kiro IDE and use Kiro Chat to start the game.

### Port 5173 already in use
**Solution:** Vite will automatically use the next available port (5174, 5175, etc.)
Check the terminal output for the correct URL.

### Audio doesn't play
**Solution:** 
- Make sure you clicked "ENTER THE NIGHTMARE"
- Check browser console (F12) for errors
- Try a different browser (Chrome works best)

### Corruption level doesn't update
**Solution:**
```bash
# Manually run The Ritual
node .kiro/hooks/measure-corruption.cjs

# Check the output file
cat public/corruption-state.json
```

### Changes don't appear in browser
**Solution:**
- Kiro auto-saves files after fixing
- Check the terminal for hook execution logs
- Try refreshing the browser (F5)

---

## 📚 What's Happening Behind the Scenes?

### When Kiro fixes a vulnerability:
1. **Kiro applies the fix** to the code
2. **Kiro saves the file** automatically
3. **Kiro runs The Ritual Hook** to scan for remaining issues
4. The hook calculates a corruption score (0-100%)
5. The hook writes to `public/corruption-state.json`
6. The React app polls this file every second
7. The UI updates based on the corruption level

### The Kiro Integration:
- **Agent Hooks:** Automatic code scanning on file save
- **MCP Server:** Allows Kiro to "sense" corruption level
- **Steering Docs:** Teaches Kiro how to fix vulnerabilities
- **Specs:** Full design and implementation plan

---

## 🎓 Learning More

### Explore the Code:
- `src/components/vulnerable/` - The intentionally broken code
- `.kiro/hooks/` - The automation scripts
- `.kiro/steering/` - Security fix guidance
- `.kiro/specs/` - Full project specification

### Read the Documentation:
- `README.md` - Project overview
- `DEMO.md` - Detailed demo script
- `.kiro/hooks/README.md` - Hook documentation
- `.kiro/hooks/DEMO_GUIDE.md` - Quick reference

---

## 🎬 Ready for the Full Demo?

Once you're comfortable with the basics, check out:
- **DEMO.md** - The 3-minute hackathon demo script
- **.kiro/hooks/DEMO_GUIDE.md** - Advanced hook features

---

## 💬 Need Help?

- Check the terminal for error messages
- Look in the browser console (F12 → Console tab)
- Review the troubleshooting section above
- Check the GitHub issues page

---

## 🎉 You're Ready!

You now know how to:
- ✅ Install and run the project
- ✅ Reset the demo state
- ✅ Fix vulnerabilities
- ✅ Watch the UI heal in real-time
- ✅ Understand the Kiro integration

**Have fun exorcising those code demons!** 👻🔮

