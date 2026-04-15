# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Chain of Responsibility Pattern

**Demo:** Form validation — username, email, and password fields each pass through a chain of validators.

### Class Roles

| Class/Interface | Role |
|---|---|
| `ValidationHandler` (interface) | Contract: `setNextHandler()` + `handleValidation()` |
| `BaseHandler` (abstract) | Stores `nextHandler`; concrete handlers extend this |
| `RequiredFieldHandler` | First in chain; rejects empty fields (takes field name in constructor) |
| `UsernameFormatHandler` | Validates alphanumeric-only username |
| `EmailFormatHandler` | Validates email format via regex |
| `PasswordFormatHandler` | Validates min 8 chars, uppercase, lowercase, digit |

### Chain Structure

```
RequiredFieldHandler("username")
  → UsernameFormatHandler
    → RequiredFieldHandler("email")
      → EmailFormatHandler
        → RequiredFieldHandler("password")
          → PasswordFormatHandler
```

`handleValidation()` returns `false` on the first failure, `true` if the entire chain passes. Handlers call `this.nextHandler.handleValidation()` to continue.
