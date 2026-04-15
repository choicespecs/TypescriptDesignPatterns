# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a collection of TypeScript Design Pattern implementations, each as a standalone browser-runnable demo. Patterns are organized into three categories: Behavioral, Creational, and Structural.

## Commands

Each pattern lives in its own subdirectory with its own `package.json`. Commands must be run from within the pattern's directory (e.g., `cd Behavioral/ChainOfResponsibility`):

```bash
npm install       # Install dependencies
npm run build     # Compile TypeScript via webpack → dist/
npm start         # Build and launch webpack-dev-server at localhost:9000
```

There are no tests (the test script exits with an error by design).

## Architecture

Every pattern follows an identical structure:

```
PatternName/
  src/
    index.ts              # Entry point: wires up DOM events and pattern instances
    interfaces/           # TypeScript interfaces and abstract base classes
    models/               # Concrete implementations of the interfaces
    types/                # Shared type definitions (present in some patterns)
  index.html              # Browser UI for the demo
  style.css
  webpack.config.js       # Bundles src/index.ts → dist/index.js, serves on port 9000
  tsconfig.json           # target: es2016, strict: true, strictPropertyInitialization: false
  package.json
```

The `index.ts` entry point always connects DOM elements to the pattern implementation. The `interfaces/` folder defines the contracts (abstract classes or TypeScript interfaces), and `models/` contains the concrete classes that fulfill them.

TypeScript is compiled by `ts-loader` through webpack. The `dist/` output is not committed. All patterns use `strict: true` with `strictPropertyInitialization: false`.

## Critical: HtmlWebpackPlugin Overwrites index.html

`webpack.config.js` uses `HtmlWebpackPlugin` with `filename: "../index.html"`, which writes the built output **back over the source `index.html`**. This means:

- The `index.html` in each pattern directory is both the template and the built output.
- **Never add `<script>` tags manually** — webpack injects them on build. Any manually added tags will be overwritten or duplicated.
- When editing `index.html`, edit it directly; after a build it reflects the compiled output.

## Window Globals: Connecting TypeScript to HTML

Webpack bundles each pattern as an isolated module. Functions defined in `index.ts` are **not** reachable from HTML `onclick`/`onsubmit` attributes by default.

To expose a function to the HTML:
```ts
(window as any).myFunction = myFunction;
```

Every pattern that uses HTML event attributes follows this convention. When adding new functions called from HTML, always add the corresponding `window` assignment at the bottom of `index.ts`.

This also applies cross-module: if a model class (e.g., `RealDatabaseAccess`) needs to call a function defined in `index.ts`, it must call it via `(window as any).functionName()` — direct imports would create circular dependencies.

## CSS Display Mode Conflicts

When showing/hiding elements with `element.style.display`, match the value to the CSS rule for that element. Setting `"block"` on a flex container breaks its layout. Check `style.css` for the element's display rule before writing:

```ts
element.style.display = "flex";  // not "block" if CSS uses display: flex
```

## Adding a New Pattern

1. Create a new directory under the appropriate category (`Behavioral/`, `Creational/`, or `Structural/`).
2. Copy `package.json`, `tsconfig.json`, `webpack.config.js`, `index.html`, and `style.css` from an existing pattern and adjust the `name` field in `package.json`.
3. Follow the `src/interfaces/` + `src/models/` + `src/index.ts` structure.
4. Expose any functions called from HTML via `(window as any).funcName = funcName` in `index.ts`.
5. Add the pattern to `README.md`.
