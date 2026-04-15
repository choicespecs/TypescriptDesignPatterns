# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Template Method Pattern

**Demo:** Logging system with three severity levels — Info, Trace, and Error each share the same logging skeleton but differ in notification message and optional high-tier alerting.

### Class Roles

| Class | Role |
|---|---|
| `LogTemplate` (abstract) | Defines the template method `log()`: calls `notify()` → `saveLog()` → `highTierNotify()`; implements `saveLog()`; provides empty default `highTierNotify()` |
| `InfoLog` | Overrides `notify()` to output `"INFO: LOGGED"` |
| `TraceLog` | Overrides `notify()` to output `"TRACE: LOGGED"` |
| `ErrorLog` | Overrides `notify()` to output `"ERROR: LOGGED"`; overrides `highTierNotify()` to log a security warning |

### Algorithm Skeleton

```
log()
  1. notify()         ← abstract, must override
  2. saveLog()        ← implemented in base class
  3. highTierNotify() ← hook, default is no-op; ErrorLog overrides
```

`saveLog()` is a concrete step common to all log types. `highTierNotify()` is a hook method — only `ErrorLog` provides a non-empty implementation. Subclasses never override `log()` itself.
