// Prototype Pattern — Prototype
// MenuItem is the prototype; clone() produces a shallow copy that callers can then customise.

/**
 * Prototype in the Prototype pattern.
 * A base MenuItem instance is created once and then cloned to produce menu items
 * with the same default values. Callers overwrite only the properties that differ,
 * avoiding repetitive constructor calls for similar objects.
 */
export class MenuItem {
  label: string;
  icon: string;
  link: string;
  isVisible: boolean;

  constructor(label: string, icon: string, link: string, isVisible: boolean) {
    this.label = label;
    this.icon = icon;
    this.link = link;
    this.isVisible = isVisible;
  }

  /** Returns a new MenuItem with all properties copied from this instance.
   *  Callers customise the clone without affecting the original prototype. */
  clone(): MenuItem {
    return new MenuItem(this.label, this.icon, this.link, this.isVisible);
  }
}
