# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proxy Pattern

**Demo:** Database access control — a protection proxy checks user permissions before allowing writes to the real database.

### Class Roles

| Class/Interface | Role |
|---|---|
| `DatabaseAccess` (interface) | Common contract: `writeData()` |
| `RealDatabaseAccess` | Real subject — performs the actual database write operation |
| `ProtectionProxyDatabaseAccess` | Proxy — implements `DatabaseAccess`; constructor checks `user.writeAccess` and conditionally creates `RealDatabaseAccess`; `writeData()` guards execution |
| `User` | Holds `writeAccess: boolean` flag checked by the proxy |

### Flow

Client creates `new ProtectionProxyDatabaseAccess(user)`. If `user.writeAccess` is `true`, the proxy instantiates `RealDatabaseAccess` internally; otherwise it holds `null`. When `writeData()` is called:
- Access granted → delegates to `RealDatabaseAccess.writeData()`
- Access denied → logs an error, no real object is invoked

Client always interacts through the `DatabaseAccess` interface and never directly instantiates `RealDatabaseAccess`.
