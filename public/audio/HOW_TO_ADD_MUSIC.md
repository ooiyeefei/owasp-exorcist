# How to Add Your Own Halloween Music

The app currently uses placeholder music. Here's how to add proper Halloween tracks:

## Option 1: Use Local Files (Recommended)

### Step 1: Download Halloween Music

**Free Sources:**
- **Pixabay**: https://pixabay.com/music/search/halloween/
- **FreePD**: https://freepd.com/ (search "horror" or "ambient")
- **Incompetech**: https://incompetech.com/music/ (search "dark" or "peaceful")

### Step 2: Add Files to Project

1. Download two MP3 files:
   - `damned.mp3` - Spooky/horror music
   - `sanctified.mp3` - Peaceful/ambient music

2. Place them in `public/audio/`:
   ```
   public/audio/
   ├── damned.mp3
   └── sanctified.mp3
   ```

### Step 3: Update the Code

Edit `src/hooks/useAudioCorruption.ts`:

```typescript
const AUDIO_TRACKS = {
  damned: '/audio/damned.mp3',
  sanctified: '/audio/sanctified.mp3'
};
```

### Step 4: Test

1. Restart dev server: `npm run dev`
2. Click "ENTER THE NIGHTMARE"
3. You should hear your music!

## Option 2: Use CDN URLs

If you find working CDN URLs, you can use them directly:

```typescript
const AUDIO_TRACKS = {
  damned: 'https://your-cdn.com/spooky-music.mp3',
  sanctified: 'https://your-cdn.com/peaceful-music.mp3'
};
```

**Requirements:**
- Must be MP3 format
- Must allow CORS (cross-origin requests)
- Must be publicly accessible
- Should be 2-5 minutes long (will loop)

## Recommended Tracks

### For Damned State (Spooky):
- "Ghostpocalypse" by Kevin MacLeod
- "Dark Fog" by Kevin MacLeod
- "Creepy" by Bensound
- Any horror movie soundtrack music

### For Sanctified State (Peaceful):
- "Ambient Piano" tracks
- "Meditation" music
- "Ethereal" ambient tracks
- Calm instrumental music

## Troubleshooting

### "Failed to load track" error
- Check file exists in `public/audio/`
- Check file is MP3 format
- Check file isn't corrupted
- Try a different file

### No sound but no errors
- Check system volume
- Check browser isn't muted
- Try refreshing the page
- Check browser console for messages

### Music cuts out
- File might be too short
- Check `loop: true` is set in Howler config
- Try a longer audio file

## Current Placeholder

The app currently uses SoundHelix test tracks. These work but aren't Halloween-themed. Replace them with proper Halloween music for the best experience!
