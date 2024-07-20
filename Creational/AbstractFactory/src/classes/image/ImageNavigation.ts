import { DisplayNavigation } from "../../interfaces/DisplayNavigation";

export class ImageNavigation implements DisplayNavigation {
  private themeNav: HTMLElement;

  constructor(themeNav: HTMLElement) {
    this.themeNav = themeNav;
  }
  display() {
    this.themeNav.style.height = "30px";
    this.themeNav.style.backgroundColor = "#B07BAC";
  }
}
