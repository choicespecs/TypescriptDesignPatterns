# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Command Pattern

**Demo:** Database record manager — insert records with undo support.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Command` (interface) | Contract: `execute()` + `undo()` |
| `Database` (interface) | Contract: `insert()` + `delete()` |
| `ApplicationDatabase` | Receiver — performs DOM manipulation for insert/delete |
| `InsertDatabase` | Command — `execute()` calls `db.insert()`, `undo()` calls `db.delete()` |
| `DeleteDatabase` | Command — inverse of InsertDatabase |
| `DatabaseApplication` | Invoker — maintains `history: Command[]`; `insert()` executes and pushes, `undo()` pops and undoes |

### Flow

`DatabaseApplication.insert()` → creates `InsertDatabase`, pushes to history, calls `execute()` → `ApplicationDatabase.insert()` updates DOM.

`DatabaseApplication.undo()` → pops last command from history, calls `undo()` → `ApplicationDatabase.delete()` reverses DOM change.
