# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mediator Pattern

**Demo:** Chat room — users send messages through a central mediator instead of communicating directly.

### Class Roles

| Class/Interface | Role |
|---|---|
| `User` (interface) | Data shape: `id`, `name` |
| `ChatMediator` (interface) | Contract: `sendMessage(sender, receiver, message)` |
| `Component` (abstract) | Holds a `mediator` reference; subclasses use it to communicate |
| `ChatRoom` | Concrete mediator — registers users, routes messages, updates DOM |
| `UserComponent` | Extends `Component`; `sendMessage()` delegates to `this.mediator.sendMessage()` |

### Flow

`UserComponent.sendMessage(receiver, message)` → `ChatRoom.sendMessage(sender, receiver, message)` → ChatRoom updates the chat display DOM element.

UserComponents never reference each other directly — all traffic flows through the single `ChatRoom` instance.
