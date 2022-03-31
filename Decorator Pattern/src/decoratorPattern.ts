let coins = 100

const addDamageButton = document.querySelector(".upgrade-weapon.tab")!;
const addModifierButton = document.querySelector(".upgrade-mod.tab")!;
const addSpecialAttributeButton = document.querySelector(".upgrade-special.tab")!;
const damageDisplay = document.querySelector(".dmg")!;
const modDisplay = document.querySelector(".mod")!;
const SpecialDisplay = document.querySelector(".special")!;

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
    private mods : string[] = ['Poison', 'Fire', 'Ice']

    constructor(weapon : Weapon) {
        super(weapon)
    }
    getDamage() { return this.weapon.getDamage() + 50 }
    getSpecial() { return this.weapon.getSpecial() }
    getMod() { 
        const index = getRandomInt(0, 2)
        const weaponMod = this.mods[index]
        const modDamage = 0.05 * (this.weapon.getDamage() + 50)
        return this.weapon.getMod() + ` ${weaponMod} ${modDamage} ` 
    }
}

const sword = new Sword();