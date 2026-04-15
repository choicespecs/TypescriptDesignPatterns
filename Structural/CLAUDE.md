# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Structural Patterns

Structural patterns deal with object composition and relationships. Each subdirectory is a standalone TypeScript/webpack demo runnable in the browser (`npm install && npm start`).

**Accent theme:** amber (`#f59e0b` family) for all structural patterns except Adapter (indigo, `#6366f1` family)

| Pattern | Demo Scenario | Core Idea |
|---|---|---|
| Adapter | Media player (YouTube/MP4/txt) | MediaAdapter wraps AdvancedMediaPlayer to satisfy the MediaPlayer interface; shows full call chain on play |
| Bridge | Notification system | Decouples notification type (Email/SMS) from display method (Toast/Modal) via NotificationBridge |
| Composite | Store inventory pricing | Product (leaf) and Store (composite) both implement `getPrice()`; Store sums its Products |
| Decorator | Weapon upgrade system | Sword is wrapped by DamageUpgrade/ModUpgrade/SpecialUpgrade decorators in any combination |
| Facade | Calculator with tax logic | CalculatorFacade hides Add/Subtract/Divide/Multiply instances behind simple public methods |
| Flyweight | Product catalog images | ImageFactory caches HTMLImageElements by URL; products share instances; shows cache hit/miss stats |
| Proxy | Database write access control | ProtectionProxyDatabaseAccess checks user.writeAccess before delegating to RealDatabaseAccess |

### Notes

- **Adapter**: source files (`YouTubePlayer`, `Mp4Player`, `MediaAdapter`, `AudioTextReader`) return strings instead of `console.log`. The demo renders a color-coded call chain (purple = client, amber = adapter, red = adaptee, green = direct) when a file is played.
- **Bridge**: has a custom `.pattern-flow` layout (2-column grid with `.flow-col`/`.flow-axis-label`) that overrides the standard single-row flow strip from `shared/base.css`. Also has significant CSS for Toast (bottom-right slide-in) and Modal (center dialog with backdrop blur) display implementations.
- **Decorator**: elemental upgrade uses fixed per-element damage values (Poison +8, Fire +12, Ice +6) — not percentage-based (which would give 0 if no damage upgrade selected first).
- **Facade**: uses `.flow-node.sm` and `.flow-node.facade-node` modifier classes (declared as overrides in `style.css`).
- **Flyweight**: `ImageFactory` singleton is module-level (not per-product). Products 4 & 5 intentionally reuse image URLs from products 1 & 2 to demonstrate cache hits. Cache stats panel shows hit/miss/saved counts.
