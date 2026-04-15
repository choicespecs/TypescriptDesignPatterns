// Decorator Pattern — Concrete Decorator (elemental modifier)
// Appends a random elemental mod (Poison / Fire / Ice) plus a 5% damage bonus
// to the mod string. getDamage and getSpecial pass through to the wrapped weapon.

import { Weapon } from "../interfaces/Weapon";
import { WeaponDecorator } from "../interfaces/WeaponDecorator";

// Defined here (not in index.ts) so this module is self-contained
const MOD_ARRAY = ["Poison", "Fire", "Ice"];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Concrete Decorator — appends a randomly chosen elemental modifier to the weapon's mod string.
 * The bonus damage is 5% of the current wrapped weapon's damage, making order of wrapping matter:
 * wrapping DamageUpgrade first yields a higher mod bonus than wrapping ModUpgrade first.
 */
export class ModUpgrade extends WeaponDecorator {
  constructor(weapon: Weapon) {
    super(weapon);
  }

  // Delegated unchanged
  getDamage() {
    return this.weapon.getDamage();
  }
  getSpecial() {
    return this.weapon.getSpecial();
  }

  // Augmented: picks a random element and appends "<element> <5%-damage-bonus>" to the mod string
  getMod() {
    const index = getRandomInt(0, 2);
    const weaponMod = MOD_ARRAY[index]; // Random elemental type from the shared array
    const modDamage = 0.05 * this.weapon.getDamage(); // Bonus scales with current damage
    return this.weapon.getMod() + ` ${weaponMod} ${modDamage} `;
  }
}
