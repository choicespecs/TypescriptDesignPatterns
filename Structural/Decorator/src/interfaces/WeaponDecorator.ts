// Decorator Pattern — Base Decorator (abstract)
// Wraps a Weapon and forwards all method calls to the wrapped instance by default.
// Concrete decorators extend this class and override only the methods they augment,
// leaving the rest to delegate transparently.

import { Weapon } from "./Weapon";

/**
 * Base Decorator — holds a reference to a wrapped Weapon and delegates all calls.
 * Concrete decorators extend this, call super (via `this.weapon`), and add their layer.
 */
export abstract class WeaponDecorator implements Weapon {
  constructor(protected weapon: Weapon) {}

  // Default pass-through: concrete decorators override whichever method they enhance
  getDamage() {
    return this.weapon.getDamage();
  }
  getSpecial() {
    return this.weapon.getSpecial();
  }
  getMod() {
    return this.weapon.getMod();
  }
}
