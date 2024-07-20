import { Weapon } from "./Weapon";

export abstract class WeaponDecorator implements Weapon {
  constructor(protected weapon: Weapon) {}
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
