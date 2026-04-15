// Decorator Pattern — Concrete Decorator (elemental modifier)
// Appends a random elemental mod (Poison / Fire / Ice) plus a 5% damage bonus
// to the mod string. getDamage and getSpecial pass through to the wrapped weapon.

import { Weapon } from "../interfaces/Weapon";
import { WeaponDecorator } from "../interfaces/WeaponDecorator";

// Defined here (not in index.ts) so this module is self-contained
const ELEMENTS: { name: string; baseDamage: number }[] = [
  { name: "Poison", baseDamage: 8  },
  { name: "Fire",   baseDamage: 12 },
  { name: "Ice",    baseDamage: 6  },
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Concrete Decorator — appends a randomly chosen elemental modifier to the weapon's mod string.
 * Each element has a fixed base damage so the modifier is always non-zero even if no
 * DamageUpgrade has been applied. Stacking multiple ModUpgrades appends additional elements.
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

  // Augmented: picks a random element and appends "<element> +<damage>" to the mod string
  getMod() {
    const element = ELEMENTS[getRandomInt(0, ELEMENTS.length - 1)];
    return this.weapon.getMod() + ` ${element.name} +${element.baseDamage} `;
  }
}
