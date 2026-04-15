# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## State Pattern

**Demo:** Bank account with balance-tier behavior — account operates differently depending on whether it is in Red, Silver, or Gold status.

### Class Roles

| Class | Role |
|---|---|
| `State` (abstract) | Holds `Account` reference; abstract `deposit()` and `withdraw()`; `name` property |
| `Account` | Context — delegates `deposit()`/`withdraw()` to current `State`; `transitionTo()` swaps state |
| `Red` | Negative balance — deposit increases balance; withdraw incurs a fee; transitions to Silver when balance > 0 |
| `Silver` | Standard tier — normal deposit/withdraw; transitions to Red (< 0) or Gold (> 1000) |
| `Gold` | Premium tier — deposit adds a 5% interest bonus; transitions to Red (< 0) or Silver (< 1000) |

### Transition Logic

Each state's `deposit()`/`withdraw()` modifies `account.balance` then checks thresholds and calls `account.transitionTo(new TargetState())` when a boundary is crossed. The `Account` itself contains no conditional logic — behavior is entirely owned by the current `State` object.
