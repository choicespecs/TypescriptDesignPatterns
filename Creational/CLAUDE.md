# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Creational Patterns

Creational patterns deal with object creation mechanisms. Each subdirectory is a standalone TypeScript/webpack demo runnable in the browser (`npm install && npm start`).

**Accent theme:** emerald (`#10b981` family — see `shared/base.css` CSS variables)

| Pattern | Demo Scenario | Core Idea |
|---|---|---|
| AbstractFactory | UI theme switcher (Text vs Image) | Two theme factories each create a coordinated family of Navigation/Window/Content components |
| Builder | Dashboard widget configurator | WidgetBuilder chains setters fluently; DashboardBuilder composes multiple widgets into HTML |
| FactoryMethod | HTTP response page renderer | Factory selects concrete WebPage subclass based on response code (200/404/503/511) |
| Prototype | Menu item cloning with visual comparison | Base prototype shown side-by-side with clones; links open in an in-demo mini browser modal |

### Notes

- **Prototype**: uses `styles.css` (not `style.css` — note the 's'). The `style.css` at 14 lines is legacy and unused. The full rewritten styles are in `styles.css` and `src/template.html` links to `styles.css`.
- **Prototype**: has an in-demo mini browser modal (`#page-overlay`, `#modal-frame`) for opening linked pages without navigating away.
