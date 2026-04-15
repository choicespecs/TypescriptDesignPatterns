// Decorator Pattern — Entry point / client
// Starts with a bare Sword and wraps it in decorators (DamageUpgrade, ModUpgrade,
// SpecialUpgrade) each time the user clicks an upgrade button, spending coins.
// The sword variable is reassigned to the new wrapped instance on each upgrade.

import { Weapon } from "./interfaces/Weapon";
import { ModUpgrade } from "./models/ModUpgrade";
import { SpecialUpgrade } from "./models/SpecialUpgrade";
import { DamageUpgrade } from "./models/DamageUpgrade";
import { Sword } from "./models/Sword";

const addDamageButton = document.querySelector(".upgrade-weapon.tab")!;
const addModifierButton = document.querySelector(".upgrade-mod.tab")!;
const addSpecialAttributeButton = document.querySelector(
  ".upgrade-special.tab"
)!;
const damageDisplay = document.querySelector(".dmg")!;
const modDisplay = document.querySelector(".mod")!;
const SpecialDisplay = document.querySelector(".special")!;
const coinDisplay = document.querySelector(".coin")!;

/** Reads all three weapon properties and reflects them in the DOM. */
function updateDisplay(weapon: Weapon, coins: number) {
  damageDisplay.innerHTML = weapon.getDamage().toString();
  modDisplay.innerHTML = weapon.getMod();
  SpecialDisplay.innerHTML = weapon.getSpecial();
  coinDisplay.innerHTML = coins.toString();

  // Disable buttons the player can no longer afford
  if (coins < 50) {
    addSpecialAttributeButton.classList.remove("active");
    addSpecialAttributeButton.classList.add("not-active");
  }
  if (coins < 25) {
    addDamageButton.classList.remove("active");
    addDamageButton.classList.add("not-active");
  }
  if (coins < 10) {
    addModifierButton.classList.remove("active");
    addModifierButton.classList.add("not-active");
  }
}

// The sword starts undecorated; each upgrade re-wraps it in a new decorator layer
let sword: Weapon = new Sword();
let coins = 100;

// Each click wraps the current sword in the chosen decorator and deducts its cost
addDamageButton.addEventListener("click", () => {
  if (coins >= 25) {
    sword = new DamageUpgrade(sword); // sword is now DamageUpgrade(previousSword)
    coins -= 25;
    updateDisplay(sword, coins);
  }
});

addModifierButton.addEventListener("click", () => {
  if (coins >= 10) {
    sword = new ModUpgrade(sword); // sword is now ModUpgrade(previousSword)
    coins -= 10;
    updateDisplay(sword, coins);
  }
});

addSpecialAttributeButton.addEventListener("click", () => {
  if (coins >= 50) {
    sword = new SpecialUpgrade(sword); // sword is now SpecialUpgrade(previousSword)
    coins -= 50;
    updateDisplay(sword, coins);
  }
});
