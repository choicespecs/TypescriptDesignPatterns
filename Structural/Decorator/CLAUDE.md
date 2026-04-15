# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Decorator Pattern

**Demo:** Weapon upgrade system — a base `Sword` is wrapped with any combination of damage, modifier, and special upgrades at runtime.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Weapon` (interface) | Contract: `getDamage()`, `getSpecial()`, `getMod()` |
| `WeaponDecorator` (abstract) | Wraps a `Weapon`; delegates all three methods to the wrapped instance |
| `Sword` | Base concrete component — returns `0` / empty string for all properties |
| `DamageUpgrade` | Decorator — adds 50 to `getDamage()` result from wrapped weapon |
| `ModUpgrade` | Decorator — appends a random elemental modifier with bonus damage to `getMod()` |
| `SpecialUpgrade` | Decorator — appends "Sharp" or "Delicate" to `getSpecial()` |

### Wrapping Example

```
new SpecialUpgrade(
  new ModUpgrade(
    new DamageUpgrade(
      new Sword()
    )
  )
)
```

Each decorator calls `super.getDamage()` (or the relevant method) on its wrapped weapon and adds to the result. Order of wrapping affects the accumulated output. No `Sword` subclass is needed for each upgrade combination.
