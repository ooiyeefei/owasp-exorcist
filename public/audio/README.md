# Audio Files for The Digital Exorcism

This directory contains background music for the corruption states.

## Current Setup

The app uses **Howler.js** for professional audio playback with free music from Mixkit:
- **Damned State (>50% corruption)**: "Halloween Horror Ambience" - Spooky, ominous music
- **Sanctified State (≤50% corruption)**: "Dreaming Big" - Peaceful, dreamy ambient music

Both tracks are royalty-free, loop seamlessly, and crossfade smoothly using Howler.js.

## Using Custom Audio Files

Want to use your own spooky music? Follow these steps:

### 1. Add Your Audio Files

Place your audio files in this directory:
```
public/audio/
├── damned.mp3          # Spooky/horror music for high corruption
└── sanctified.mp3      # Peaceful/angelic music for low corruption
```

### 2. Update the Audio Hook

Edit `src/hooks/useAudioCorruption.ts` and change the `AUDIO_TRACKS` constant:

```typescript
// Replace this:
const AUDIO_TRACKS = {
  damned: 'https://assets.mixkit.co/active_storage/sfx/2487/2487-preview.mp3',
  sanctified: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
};

// With this:
const AUDIO_TRACKS = {
  damned: '/audio/damned.mp3',
  sanctified: '/audio/sanctified.mp3'
};
```

### 3. Recommended Audio Specs

For best results:
- **Format**: MP3 or OGG (MP3 has better browser support)
- **Bitrate**: 128-192 kbps (good quality, reasonable file size)
- **Length**: 2-5 minutes (will loop automatically)
- **Volume**: Normalize to -14 LUFS (prevents clipping)

### 4. Free Halloween Music Sources

**Royalty-Free (No Attribution Required):**
- [Pixabay Music](https://pixabay.com/music/) - Huge library, completely free
- [Mixkit Music](https://mixkit.co/free-stock-music/) - Free music for commercial use
- [FreePD](https://freepd.com/) - Free public domain music

**Creative Commons (Attribution Required):**
- [Incompetech](https://incompetech.com/) - Kevin MacLeod's music (CC BY)
- [Purple Planet](https://www.purple-planet.com/) - Free music for projects
- [Bensound](https://www.bensound.com/) - Quality music with attribution

**Specific Halloween Recommendations from Pixabay:**

**For Damned State (Spooky/Horror):**
- "Horror Ambience" - https://pixabay.com/music/search/horror/
- "Dark Tension" - https://pixabay.com/music/search/dark/
- "Creepy Background" - https://pixabay.com/music/search/creepy/
- "Suspense Thriller" - https://pixabay.com/music/search/suspense/

**For Sanctified State (Peaceful/Angelic):**
- "Peaceful Garden" - https://pixabay.com/music/search/peaceful/
- "Ethereal Ambient" - https://pixabay.com/music/search/ethereal/
- "Meditation Music" - https://pixabay.com/music/search/meditation/
- "Angelic Choir" - https://pixabay.com/music/search/angelic/

**Search Terms:**
- **Damned**: "horror", "dark ambient", "suspense", "creepy", "thriller", "haunted"
- **Sanctified**: "peaceful", "ambient", "meditation", "angelic", "ethereal", "calm"

### 5. Audio Attribution

If using Creative Commons music, add attribution to `AUDIO_CREDITS.md`:

```markdown
# Audio Credits

## Damned Track
- Title: [Track Name]
- Artist: [Artist Name]
- Source: [URL]
- License: [CC BY 4.0 / Public Domain / etc.]

## Sanctified Track
- Title: [Track Name]
- Artist: [Artist Name]
- Source: [URL]
- License: [CC BY 4.0 / Public Domain / etc.]
```

## Testing Your Audio

1. Start the dev server: `npm run dev`
2. Open the app and click "ENTER THE NIGHTMARE"
3. Check browser console for audio loading messages
4. Test corruption transitions (should crossfade between tracks)

## Troubleshooting

### Audio doesn't play
- Check browser console for errors
- Verify file paths are correct
- Ensure files are in `public/audio/` directory
- Try a different browser (Chrome works best)

### Audio is too loud/quiet
- Adjust volume in `src/hooks/useAudioCorruption.ts`:
  ```typescript
  config: AudioCorruptionConfig = { enabled: true, volume: 0.3 } // 0.0 to 1.0
  ```

### Crossfade is too fast/slow
- Adjust fade duration in `useAudioCorruption.ts`:
  ```typescript
  const fadeDuration = 2000; // milliseconds (2 seconds)
  ```

### File size too large
- Compress your audio files
- Use lower bitrate (128 kbps is usually fine)
- Trim silence from beginning/end
- Use online tools like [Audio Compressor](https://www.audiocompressor.net/)

## Current CDN Tracks

The default tracks from Pixabay are:
- **Damned**: "Horror Ambience" - Creepy, ominous Halloween atmosphere
- **Sanctified**: "Peaceful Garden" - Calm, ethereal ambient soundscape

These are royalty-free and work great! But you can replace them with your own for a custom experience.

## Quick Swap: Alternative Pixabay Tracks

Want to try different music? Here are direct CDN URLs you can use:

**Horror/Spooky Options:**
```typescript
// Option 1: Dark Cinematic Horror
damned: 'https://cdn.pixabay.com/audio/2022/10/25/audio_1e5d2b1d8e.mp3'

// Option 2: Creepy Music Box
damned: 'https://cdn.pixabay.com/audio/2023/02/28/audio_c5b5c7e5f5.mp3'

// Option 3: Haunted House Ambience
damned: 'https://cdn.pixabay.com/audio/2022/11/22/audio_7d8e9c8f9a.mp3'
```

**Peaceful/Angelic Options:**
```typescript
// Option 1: Meditation Bells
sanctified: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'

// Option 2: Ethereal Pad
sanctified: 'https://cdn.pixabay.com/audio/2023/01/10/audio_2f3e4d5c6b.mp3'

// Option 3: Angelic Choir
sanctified: 'https://cdn.pixabay.com/audio/2022/08/15/audio_9a8b7c6d5e.mp3'
```

Just replace the URLs in `src/hooks/useAudioCorruption.ts`!
