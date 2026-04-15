// Decorator Pattern — Concrete Decorator (damage upgrade)
// Adds a flat +50 damage on top of whatever the wrapped weapon already has.
// All other methods (getSpecial, getMod) are delegated unchanged to the inner weapon.

import { WeaponDecorator } from "../interfaces/WeaponDecorator";
import { Weapon } from "../interfaces/Weapon";

/**
 * Concrete Decorator — wraps a Weapon and adds 50 to its damage value.
 * Stacking multiple DamageUpgrades is valid; each layer adds another +50.
 */
export class DamageUpgrade extends WeaponDecorator {
  constructor(weapon: Weapon) {
    super(weapon);
  }

  // Augmented: returns inner weapon's damage plus the flat bonus
  getDamage() {
    return this.weapon.getDamage() + 50;
  }

  // Delegated unchanged
  getSpecial() {
    return this.weapon.getSpecial();
  }
  getMod() {
    return this.weapon.getMod();
  }
}
