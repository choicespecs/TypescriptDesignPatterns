# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Facade Pattern

**Demo:** Calculator with tax — a `CalculatorFacade` provides a simple API over Add, Subtract, Divide, and Multiply subsystem classes.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Calculator` (interface) | Subsystem contract: `calculate(num1, num2)` |
| `Add` / `Subtract` / `Divide` / `Multiply` | Concrete subsystem classes — each implements one arithmetic operation |
| `CalculatorFacade` | Facade — instantiates all four operation classes; exposes `calculateAdd()`, `calculateSubtract()`, `calculateDivide()`, `calculateMultiply()` |

### Flow

Client code calls `facade.calculateAdd(a, b)` instead of instantiating and calling `new Add().calculate(a, b)` directly. The facade also enables composition — the tax calculation in `index.ts` chains `calculateMultiply()` and `calculateAdd()` through the facade without knowing the underlying classes.

The facade does not add new behavior; it simplifies the interface to the subsystem.
