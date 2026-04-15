// Abstract Factory Pattern — ConcreteProduct (text-theme window)
// Applies pink background and narrow width when display() is called.

import { DisplayWindow } from "../../interfaces/DisplayWindow";

/**
 * ConcreteProduct for the text-theme window area.
 * Implements DisplayWindow.display() with the Text family's pink background and 300px width.
 * Created exclusively by TextTheme.
 */
export class TextWindow implements DisplayWindow {
  private themeWindow: HTMLElement;

  constructor(themeWindow: HTMLElement) {
    this.themeWindow = themeWindow;
  }
  display() {
    this.themeWindow.style.backgroundColor = "pink"; // Text-theme window colour
    this.themeWindow.style.width = "300px";
  }
}
