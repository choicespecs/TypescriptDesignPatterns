// Decorator Pattern — Concrete Component (base weapon)
// The undecorated object. Returns zero damage and empty strings for mod/special.
// Decorators wrap this instance and layer additional behaviour on top.

import { Weapon } from "../interfaces/Weapon";

/**
 * Concrete Component — the base sword before any upgrades are applied.
 * All decorator chains start here; decorators add to these base values.
 */
export class Sword implements Weapon {
  // Terminal values — decorators read these and augment them
  getDamage() {
    return 0;
  }
  getSpecial() {
    return "";
  }
  getMod() {
    return "";
  }
}
