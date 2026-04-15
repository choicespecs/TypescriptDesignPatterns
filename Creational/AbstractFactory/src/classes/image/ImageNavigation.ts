// Abstract Factory Pattern — ConcreteProduct (image-theme navigation bar)
// Applies a purple colour (#B07BAC) when display() is called.

import { DisplayNavigation } from "../../interfaces/DisplayNavigation";

/**
 * ConcreteProduct for the image-theme navigation bar.
 * Implements DisplayNavigation.display() with the Image family's purple colour (#B07BAC).
 * Created exclusively by ImageTheme.
 */
export class ImageNavigation implements DisplayNavigation {
  private themeNav: HTMLElement;

  constructor(themeNav: HTMLElement) {
    this.themeNav = themeNav;
  }
  display() {
    this.themeNav.style.height = "30px";
    this.themeNav.style.backgroundColor = "#B07BAC"; // Image-theme purple nav colour
  }
}
