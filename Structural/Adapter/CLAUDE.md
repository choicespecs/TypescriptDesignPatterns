# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Adapter Pattern

**Demo:** Media player — a standard `MediaPlayer` interface is used to play YouTube videos, MP4 files, and text files despite the underlying players having incompatible interfaces.

### Class Roles

| Class/Interface | Role |
|---|---|
| `MediaPlayer` (interface) | Target interface: `play(mediaType, fileName)` |
| `AdvancedMediaPlayer` (interface) | Adaptee interface: `playVid(fileName)` + `playMusic(fileName)` |
| `YouTubePlayer` | Adaptee — implements `AdvancedMediaPlayer.playVid()` |
| `Mp4Player` | Adaptee — implements `AdvancedMediaPlayer.playMusic()` |
| `MediaAdapter` | Adapter — implements `MediaPlayer`; wraps an `AdvancedMediaPlayer`; `play()` routes to `playVid()` or `playMusic()` |
| `AudioTextReader` | Client-facing class — implements `MediaPlayer`; handles `.txt` directly; delegates `youtube`/`mp4` types to `MediaAdapter` |

### Flow

Client calls `AudioTextReader.play(mediaType, fileName)`. For `.txt`, it handles internally. For `youtube`/`mp4`, it creates a `MediaAdapter` with the correct `AdvancedMediaPlayer` and delegates. The adapter translates the `play()` call into the appropriate `AdvancedMediaPlayer` method.
