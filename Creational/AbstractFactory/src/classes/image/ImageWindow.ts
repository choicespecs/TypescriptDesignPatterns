// Abstract Factory Pattern — ConcreteProduct (image-theme window)
// Applies a rounded, wider light-grey container style when display() is called.

import { DisplayWindow } from "../../interfaces/DisplayWindow";

/**
 * ConcreteProduct for the image-theme window area.
 * Implements DisplayWindow.display() with the Image family's wider, rounded style.
 * Created exclusively by ImageTheme.
 */
export class ImageWindow implements DisplayWindow {
  private themeWindow: HTMLElement;

  constructor(themeWindow: HTMLElement) {
    this.themeWindow = themeWindow;
  }
  display() {
    this.themeWindow.style.backgroundColor = "#D9D7DD"; // Image-theme light-grey background
    this.themeWindow.style.overflow = "hidden";
    this.themeWindow.style.borderRadius = "2em";
    this.themeWindow.style.width = "600px"; // Wider than the Text-theme window
  }
}
