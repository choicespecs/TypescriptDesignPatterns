// Abstract Factory Pattern — ConcreteProduct (text-theme navigation bar)
// Applies dark-brown styling when display() is called.

import { DisplayNavigation } from "../../interfaces/DisplayNavigation";

/**
 * ConcreteProduct for the text-theme navigation bar.
 * Implements DisplayNavigation.display() with the Text family's specific colour (#663F46).
 * Created exclusively by TextTheme — never instantiated directly by client code.
 */
export class TextNavigation implements DisplayNavigation {
  private themeNav: HTMLElement;

  constructor(themeNav: HTMLElement) {
    this.themeNav = themeNav;
  }
  display() {
    this.themeNav.style.height = "30px";
    this.themeNav.style.backgroundColor = "#663F46"; // Text-theme dark-brown nav colour
  }
}
