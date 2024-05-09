
const MOD_ARRAY = ['Poison', 'Fire', 'Ice']

const addDamageButton = document.querySelector(".upgrade-weapon.tab")!;
const addModifierButton = document.querySelector(".upgrade-mod.tab")!;
const addSpecialAttributeButton = document.querySelector(".upgrade-special.tab")!;
const damageDisplay = document.querySelector(".dmg")!;
const modDisplay = document.querySelector(".mod")!;
const SpecialDisplay = document.querySelector(".special")!;
const coinDisplay = document.querySelector(".coin")!;


function getRandomInt(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Weapon {
    getDamage() : number;
    getSpecial() : string;
    getMod() : string;
}

abstract class WeaponDecorator implements Weapon {
    constructor( protected weapon : Weapon) {}
    getDamage() { return this.weapon.getDamage() }
    getSpecial() { return this.weapon.getSpecial() }
    getMod() { return this.weapon.getMod() }
}

class Sword implements Weapon {
    getDamage() { return 0 }
    getSpecial() { return ''}
    getMod() { return '' }
}

class DamageUpgrade extends WeaponDecorator {
    constructor(weapon : Weapon) {
        super(weapon)
    }
    getDamage() { return this.weapon.getDamage() + 50 }
    getSpecial() { return this.weapon.getSpecial() }
    getMod() { return this.weapon.getMod() }
}

class SpecialUpgrade extends WeaponDecorator {
    constructor(weapon : Weapon) {
        super(weapon)
    }
    getDamage() { return this.weapon.getDamage() }
    getSpecial() { 
        if (this.weapon.getSpecial() === "") {
            return this.weapon.getSpecial() + " Sharp " 
        } else {
            return this.weapon.getSpecial() + " Delicate "
        }
        
    }
    getMod() { return this.weapon.getMod() }
}

class ModUpgrade extends WeaponDecorator {
    constructor(weapon : Weapon) {
        super(weapon)
    }
    getDamage() { return this.weapon.getDamage() }
    getSpecial() { return this.weapon.getSpecial() }
    getMod() { 
        const index = getRandomInt(0, 2)
        const weaponMod = MOD_ARRAY[index]
        const modDamage = 0.05 * (this.weapon.getDamage())
        return this.weapon.getMod() + ` ${weaponMod} ${modDamage} ` 
    }
}

function updateDisplay(weapon : Weapon, coins : number) {
    damageDisplay.innerHTML = weapon.getDamage().toString();
    modDisplay.innerHTML = weapon.getMod();
    SpecialDisplay.innerHTML = weapon.getSpecial();
    coinDisplay.innerHTML = coins.toString();
    if (coins < 50) {
        addSpecialAttributeButton.classList.remove('active');
        addSpecialAttributeButton.classList.add('not-active');
    }
    if (coins < 25) {
        addDamageButton.classList.remove('active');
        addDamageButton.classList.add('not-active');
    }
    if (coins < 10) {
        addModifierButton.classList.remove('active');
        addModifierButton.classList.add('not-active');
    }
}

let sword : Weapon = new Sword();
let coins = 100

addDamageButton.addEventListener("click", () => {
    if (coins >= 25) {
        sword = new DamageUpgrade(sword);
        coins -= 25
        updateDisplay(sword, coins);
    } 
});

addModifierButton.addEventListener("click", () => {
    if (coins >= 10) {
        sword = new ModUpgrade(sword);
        coins -= 10
        updateDisplay(sword, coins);
    } 
});

addSpecialAttributeButton.addEventListener("click", () => {
    if (coins >= 50) {
        sword = new SpecialUpgrade(sword);
        coins -= 50
        updateDisplay(sword, coins);
    } 
});


