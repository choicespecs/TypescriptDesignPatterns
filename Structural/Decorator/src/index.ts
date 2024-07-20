import { Weapon } from "./interfaces/Weapon";
import { ModUpgrade } from "./models/ModUpgrade";
import { SpecialUpgrade } from "./models/SpecialUpgrade";
import { DamageUpgrade } from "./models/DamageUpgrade";
import { Sword } from "./models/Sword";

const MOD_ARRAY = ["Poison", "Fire", "Ice"];

const addDamageButton = document.querySelector(".upgrade-weapon.tab")!;
const addModifierButton = document.querySelector(".upgrade-mod.tab")!;
const addSpecialAttributeButton = document.querySelector(
  ".upgrade-special.tab"
)!;
const damageDisplay = document.querySelector(".dmg")!;
const modDisplay = document.querySelector(".mod")!;
const SpecialDisplay = document.querySelector(".special")!;
const coinDisplay = document.querySelector(".coin")!;

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateDisplay(weapon: Weapon, coins: number) {
  damageDisplay.innerHTML = weapon.getDamage().toString();
  modDisplay.innerHTML = weapon.getMod();
  SpecialDisplay.innerHTML = weapon.getSpecial();
  coinDisplay.innerHTML = coins.toString();
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

let sword: Weapon = new Sword();
let coins = 100;

addDamageButton.addEventListener("click", () => {
  if (coins >= 25) {
    sword = new DamageUpgrade(sword);
    coins -= 25;
    updateDisplay(sword, coins);
  }
});

addModifierButton.addEventListener("click", () => {
  if (coins >= 10) {
    sword = new ModUpgrade(sword);
    coins -= 10;
    updateDisplay(sword, coins);
  }
});

addSpecialAttributeButton.addEventListener("click", () => {
  if (coins >= 50) {
    sword = new SpecialUpgrade(sword);
    coins -= 50;
    updateDisplay(sword, coins);
  }
});
