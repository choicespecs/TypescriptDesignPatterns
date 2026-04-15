# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Observer Pattern

**Demo:** Activity log — multiple user observers subscribe to a central log; all are notified when new entries are added.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Observer` (interface) | Contract: `update()` |
| `Subject` (interface) | Contract: `add()`, `remove()`, `notify()` |
| `Log` | Concrete subject — holds `ObserverList: Observer[]` and `logList: string[]`; `setState()` appends to log and calls `notify()` |
| `User` | Concrete observer — subscribed to `Log`; `update()` fetches latest log entry and renders it to DOM |

### Flow

`Log.setState(entry)` → appends to `logList` → calls `notify()` → each `User.update()` reads latest entry from `Log` and updates its DOM element.

Push model: the subject triggers all observers on every state change without the observer requesting it.
