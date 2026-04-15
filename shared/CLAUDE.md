# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Shared Modules

This directory contains the three shared files used by all 21 design pattern demos. Changes here affect every pattern — build a few representative patterns after editing to verify nothing broke.

```
shared/
  tsconfig.base.json   # Base TypeScript compiler options
  webpack.base.js      # Webpack config factory function
  base.css             # Shared reset and layout styles
```

### tsconfig.base.json

Minimal shared compiler options. **Do not add `rootDir` or `outDir`** — those are path-sensitive and resolve relative to the file they're declared in. If added here they'd resolve to `shared/src` and `shared/dist` instead of the pattern's own directories.

Each pattern extends this with a one-liner:
```json
{ "extends": "../../shared/tsconfig.base.json" }
```

If a pattern needs extra compiler options it can add a `"compilerOptions"` block alongside `"extends"`.

### webpack.base.js

Factory: `createConfig(patternDir, options?)` where `patternDir` is `__dirname` from the calling pattern's `webpack.config.js`.

**Critical:** The factory uses `module.createRequire(patternDir + "/package.json")` to load `html-webpack-plugin` and loaders. This is because Node resolves `require()` relative to the file that calls it — if the factory called `require("html-webpack-plugin")` directly, it would look in `shared/node_modules/` (which doesn't exist) instead of the pattern's own `node_modules/`. **Do not install any packages in `shared/` — all npm packages must live in each pattern's `node_modules/`.**

Options:
- `template` (string, default `"./src/template.html"`) — path to the HtmlWebpackPlugin template
- `port` (number, default `9000`) — dev server port

The Hub's `webpack.config.js` is **not** derived from this factory — it has unique devServer config (port 9001, serves repo root) and manages its own plugins.

### base.css

Provides: reset (`*, *::before, *::after`), `body`, `.pattern-header`, `.pattern-badge`, `.pattern-title`, `.pattern-desc`, `.pattern-flow`, `.flow-node`, `.flow-node.highlight`, `.flow-node span`, `.flow-arrow`.

All color/theme properties reference CSS custom properties (`--badge-bg`, `--node-cl`, etc.). Each pattern's `style.css` sets these vars in its `:root` block:

**Indigo theme** (Behavioral + Adapter):
```css
--badge-bg: rgba(99,102,241,0.15);  --badge-cl: #a5b4fc;    --badge-bd: rgba(99,102,241,0.3);
--flow-bg:  rgba(99,102,241,0.04);
--node-bg:  rgba(99,102,241,0.08);  --node-bd: rgba(99,102,241,0.2);   --node-cl: #818cf8;
--node-hi-bg: rgba(99,102,241,0.2); --node-hi-bd: rgba(99,102,241,0.5); --node-hi-cl: #a5b4fc;
```

**Emerald theme** (Creational):
```css
--badge-bg: rgba(16,185,129,0.15);  --badge-cl: #6ee7b7;    --badge-bd: rgba(16,185,129,0.3);
--flow-bg:  rgba(16,185,129,0.04);
--node-bg:  rgba(16,185,129,0.08);  --node-bd: rgba(16,185,129,0.2);   --node-cl: #34d399;
--node-hi-bg: rgba(16,185,129,0.18); --node-hi-bd: rgba(16,185,129,0.45); --node-hi-cl: #6ee7b7;
```

**Amber theme** (Structural except Adapter):
```css
--badge-bg: rgba(245,158,11,0.15);  --badge-cl: #fcd34d;    --badge-bd: rgba(245,158,11,0.3);
--flow-bg:  rgba(245,158,11,0.04);
--node-bg:  rgba(245,158,11,0.08);  --node-bd: rgba(245,158,11,0.2);   --node-cl: #fbbf24;
--node-hi-bg: rgba(245,158,11,0.18); --node-hi-bd: rgba(245,158,11,0.45); --node-hi-cl: #fcd34d;
```

#### How `../../shared/base.css` resolves

The `@import "../../shared/base.css"` relative path works in every context because all patterns are exactly 2 directory levels deep (`Category/PatternName/`), so `../../` always reaches the repo root:

- **Standalone dev** (port 9000): `style.css` is at `/style.css` (served at root). `../../shared/base.css` normalises to `/shared/base.css`. The devServer in `webpack.base.js` serves `shared/` at `/shared/`, so this resolves correctly.
- **Hub dev** (port 9001): Hub serves the repo root at `/`. Pattern CSS is at `/Category/Pattern/style.css`. `../../` → repo root → `shared/base.css` ✓
- **GitHub Pages project page** (e.g. `https://user.github.io/TypescriptDesignPatterns/`): Pattern CSS is at `.../Category/Pattern/style.css`. `../../` → site root → `shared/base.css`. The deploy workflow copies `shared/base.css` to `_site/shared/base.css` ✓

**Do not change this to an absolute path** (`/shared/base.css`). On GitHub Pages project pages, absolute paths resolve to the domain root (`user.github.io/shared/base.css`), not the repo root — the file would 404.

#### Pattern overrides

Some patterns override `.flow-arrow` or `.flow-node` after the import because they predate the standard values:
- ChainOfResponsibility: non-standard node opacity + no highlight variant
- Command: `.flow-node.role` modifier + 1.1rem arrow
- Iterator, Mediator, Memento, Template: 1.1rem arrow
- State: 1rem arrow
- Facade: `.flow-node.sm` + `.flow-node.facade-node` modifiers
- Bridge: custom `.pattern-flow` (2-column layout, overrides entire block)

These overrides are at the top of each pattern's `style.css`, immediately after the `:root` vars block.
