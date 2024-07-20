import { Weapon } from "../interfaces/Weapon";

export class Sword implements Weapon {
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
