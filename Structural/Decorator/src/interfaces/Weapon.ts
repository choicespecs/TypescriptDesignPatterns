// Decorator Pattern — Component interface
// The uniform contract satisfied by both the base component (Sword) and all decorators.
// Every decorator must implement this interface so wrapped objects stay interchangeable.

/** Component interface: both the Concrete Component and every Decorator implement this. */
export interface Weapon {
  getDamage(): number;
  getSpecial(): string;
  getMod(): string;
}
