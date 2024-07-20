import { Weapon } from "../interfaces/Weapon";
import { WeaponDecorator } from "../interfaces/WeaponDecorator";

export class ModUpgrade extends WeaponDecorator {
  constructor(weapon: Weapon) {
    super(weapon);
  }
  getDamage() {
    return this.weapon.getDamage();
  }
  getSpecial() {
    return this.weapon.getSpecial();
  }
  getMod() {
    const index = getRandomInt(0, 2);
    const weaponMod = MOD_ARRAY[index];
    const modDamage = 0.05 * this.weapon.getDamage();
    return this.weapon.getMod() + ` ${weaponMod} ${modDamage} `;
  }
}
