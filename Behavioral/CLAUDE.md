# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavioral Patterns

Behavioral patterns focus on communication and responsibility between objects. Each subdirectory is a standalone TypeScript/webpack demo runnable in the browser (`npm install && npm start`).

**Accent theme:** indigo (`#6366f1` family — see `shared/base.css` CSS variables)

| Pattern | Demo Scenario | Core Idea |
|---|---|---|
| ChainOfResponsibility | Form field validation | Handlers linked in a chain; each validates one rule and passes to next |
| Command | Database record insert/undo | Encapsulate operations as objects with execute/undo; maintain history |
| Iterator | LRU cache traversal | Custom iterator over doubly-linked list; exposes MRU/LRU access |
| Mediator | Chat room messaging | Users communicate through central ChatRoom, not directly |
| Memento | Rich text editor undo | Snapshots of editor content stored in a stack; undo pops and restores |
| Observer | Activity log subscription | Log notifies multiple User observers when state changes |
| State | Bank account tiers (Red/Silver/Gold) | Account delegates deposit/withdraw behavior to current state object |
| Strategy | Payment methods (Credit/PayPal/Bank) | User selects payment algorithm at runtime; each has different fee logic |
| Template | Log levels (Info/Trace/Error) | Abstract log() template calls hook methods; subclasses override notify() |
| Visitor | Employee salary bonus processing | PayrollProcessor visits Engineer/Manager with type-specific bonus rates |

### Notes

- **ChainOfResponsibility**: uses slightly non-standard flow-node colors (rgba 0.12/0.25 instead of standard 0.08/0.2). Override is declared in its `style.css` after the `@import`.
- **Command**: has `.flow-node.role` — a modifier class for labelled role nodes. Override kept in `style.css`.
- **Iterator, Mediator, Memento, Template**: use `font-size: 1.1rem` for `.flow-arrow` (older style). Override in `style.css`.
- **State**: uses `font-size: 1rem` for `.flow-arrow`. Override in `style.css`.
- **Strategy**: after fixes — `$2000` initial balance, custom amount input, Reset button, fee breakdown display after each payment.
- **Visitor**: uses DOM-based result rendering (no `alert()`). Hub iframe blocks `alert()` by design (no `allow-modals` in sandbox).
