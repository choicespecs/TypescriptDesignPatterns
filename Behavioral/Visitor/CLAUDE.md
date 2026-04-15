# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visitor Pattern

**Demo:** Payroll processing — Engineers receive a 10% salary bonus, Managers receive 20%, applied by a visitor without modifying the employee classes.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Employee` (interface) | Data shape: `name`, `salary`, `department`; declares `accept(visitor)` |
| `EmployeeVisitor` (interface) | Contract: `visit(employee)` |
| `Engineer` | Concrete element — implements `accept()`, calls `visitor.visit(this)` |
| `Manager` | Concrete element — implements `accept()`, calls `visitor.visit(this)` |
| `PayrollProcessor` | Concrete visitor — `visit()` checks `instanceof` and applies 10% (Engineer) or 20% (Manager) bonus |

### Double Dispatch

```
ProcessSalary(type, name, salary)
  → creates Engineer or Manager
  → creates PayrollProcessor
  → employee.accept(processor)
    → processor.visit(employee)   ← actual bonus logic runs here
```

The `instanceof` check inside `PayrollProcessor.visit()` dispatches to the correct bonus calculation. Salary algorithm lives entirely in the visitor, leaving employee classes unchanged.
