// Decorator Pattern — Concrete Decorator (special attribute)
// Appends a special quality label to the weapon's special string.
// First application adds "Sharp"; any subsequent application adds "Delicate"
// (because the special string is no longer empty after the first wrap).

import { WeaponDecorator } from "../interfaces/WeaponDecorator";
import { Weapon } from "../interfaces/Weapon";

/**
 * Concrete Decorator — appends a special quality to the weapon's special attribute.
 * The label alternates based on whether the inner weapon already has a special value,
 * demonstrating how decorator state can depend on the wrapped object's current state.
 */
export class SpecialUpgrade extends WeaponDecorator {
  constructor(weapon: Weapon) {
    super(weapon);
  }

  // Delegated unchanged
  getDamage() {
    return this.weapon.getDamage();
  }

  // Augmented: "Sharp" for an unspecialized weapon, "Delicate" if already specialized
  getSpecial() {
    if (this.weapon.getSpecial() === "") {
      return this.weapon.getSpecial() + " Sharp ";
    } else {
      return this.weapon.getSpecial() + " Delicate ";
    }
  }

  // Delegated unchanged
  getMod() {
    return this.weapon.getMod();
  }
}
