# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Abstract Factory Pattern

**Demo:** UI theme switcher — selecting "Text" or "Image" theme produces a coordinated set of Navigation, Window, and Content components.

### Class Roles

| Class/Interface | Role |
|---|---|
| `DisplayThemeGenerator` (interface) | Factory contract: `createNavigation()`, `createWindow()`, `createContent()` |
| `DisplayNavigation` / `DisplayWindow` / `DisplayContent` (interfaces) | Product contracts: each declares `display()` |
| `TextTheme` | Concrete factory — creates Text-family products (dark brown nav, pink window, Lorem Ipsum content) |
| `ImageTheme` | Concrete factory — creates Image-family products (purple nav, light-purple window, Unsplash image content) |
| `Text*` / `Image*` classes | Concrete products — implement `display()` with theme-specific DOM manipulation |

### Flow

Client selects a factory (`TextTheme` or `ImageTheme`) and calls `createNavigation()`, `createWindow()`, `createContent()`, then calls `display()` on each product. Swapping the factory swaps the entire coordinated UI family without touching the client code.
