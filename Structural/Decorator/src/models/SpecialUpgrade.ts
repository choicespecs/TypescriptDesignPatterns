import { WeaponDecorator } from "../interfaces/WeaponDecorator";
import { Weapon } from "../interfaces/Weapon";

export class SpecialUpgrade extends WeaponDecorator {
  constructor(weapon: Weapon) {
    super(weapon);
  }
  getDamage() {
    return this.weapon.getDamage();
  }
  getSpecial() {
    if (this.weapon.getSpecial() === "") {
      return this.weapon.getSpecial() + " Sharp ";
    } else {
      return this.weapon.getSpecial() + " Delicate ";
    }
  }
  getMod() {
    return this.weapon.getMod();
  }
}
