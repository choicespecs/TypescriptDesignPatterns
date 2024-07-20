import { WeaponDecorator } from "../interfaces/WeaponDecorator";
import { Weapon } from "../interfaces/Weapon";

export class DamageUpgrade extends WeaponDecorator {
  constructor(weapon: Weapon) {
    super(weapon);
  }
  getDamage() {
    return this.weapon.getDamage() + 50;
  }
  getSpecial() {
    return this.weapon.getSpecial();
  }
  getMod() {
    return this.weapon.getMod();
  }
}
