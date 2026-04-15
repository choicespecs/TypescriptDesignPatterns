# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Adapter Pattern

**Demo:** Media player — a standard `MediaPlayer` interface is used to play YouTube videos, MP4 files, and text files despite the underlying players having incompatible interfaces. Playing a file renders a color-coded call chain showing which path was taken.

### Class Roles

| Class/Interface | Role |
|---|---|
| `MediaPlayer` (interface) | Target interface: `play(mediaType, fileName): string` |
| `AdvancedMediaPlayer` (interface) | Adaptee interface: `playVid(fileName): string` + `playMusic(fileName): string` |
| `YouTubePlayer` | Adaptee — implements `playVid()` (returns result string); `playMusic()` is a no-op |
| `Mp4Player` | Adaptee — implements `playMusic()` (returns result string); `playVid()` is a no-op |
| `MediaAdapter` | Adapter — implements `MediaPlayer`; wraps an `AdvancedMediaPlayer`; `play()` routes to `playVid()` or `playMusic()`; exposes `adapteeClass` string for UI |
| `AudioTextReader` | Client-facing class — implements `MediaPlayer`; handles `.txt` directly; delegates `youtube`/`mp4` to `MediaAdapter`; exposes `getLastAdapter()` |

### Flow

```
AudioTextReader.play("youtube", "video.mp4")
  → creates MediaAdapter("youtube") wrapping YouTubePlayer
  → adapter.play("youtube", "video.mp4")
    → YouTubePlayer.playVid("video.mp4")  ← incompatible interface, adapted

AudioTextReader.play("txt", "README.txt")
  → handles directly — no adapter created
```

### Call Chain UI

`src/index.ts` reads `reader.getLastAdapter()` after each play call to determine whether an adapter was used. The result panel renders color-coded steps:
- Purple dot: `AudioTextReader` (client / target)
- Amber dot: `MediaAdapter` (adapter)
- Red dot: `YouTubePlayer` / `Mp4Player` (adaptee)
- Green dot: direct read (TXT path, no adapter)

### Notes

- All source model files return strings (not `console.log`) so results can be displayed in the DOM.
- The `adapteeClass` property on `MediaAdapter` (set in the constructor) is used by the UI to show which concrete adaptee was instantiated.
- Accent theme: indigo (`#6366f1` family) — same as Behavioral patterns.
