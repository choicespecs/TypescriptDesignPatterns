// Base Menu Prototype
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

  clone(): MenuItem {
    return new MenuItem(this.label, this.icon, this.link, this.isVisible);
  }
}
