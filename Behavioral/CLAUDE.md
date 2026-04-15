# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavioral Patterns

Behavioral patterns focus on communication and responsibility between objects. Each subdirectory is a standalone TypeScript/webpack demo runnable in the browser (`npm install && npm start`).

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
