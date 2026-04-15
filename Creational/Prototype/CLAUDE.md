# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Prototype Pattern

**Demo:** Menu item cloning — a base prototype is cloned to create multiple menu items, each customized with different labels and links.

### Class Roles

| Class | Role |
|---|---|
| `MenuItem` | Prototype — holds `label`, `icon`, `link`, `isVisible`; `clone()` returns a shallow copy via `new MenuItem(...)` with current values |

### Flow

```
baseMenuItemPrototype  (Home, icon, /, visible)
  .clone() → menuItem1  (modified: label, link)
  .clone() → menuItem2  (modified: label, link)
```

Cloned items start with the prototype's values, then specific properties are overwritten. The array of clones is rendered to the DOM. Avoids repeated constructor calls with the same boilerplate values for each item in a family of similar objects.
