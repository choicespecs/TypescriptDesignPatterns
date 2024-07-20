import { DisplayWindow } from "../../interfaces/DisplayWindow";

export class ImageWindow implements DisplayWindow {
  private themeWindow: HTMLElement;

  constructor(themeWindow: HTMLElement) {
    this.themeWindow = themeWindow;
  }
  display() {
    this.themeWindow.style.backgroundColor = "#D9D7DD";
    this.themeWindow.style.overflow = "hidden";
    this.themeWindow.style.borderRadius = "2em";
    this.themeWindow.style.width = "600px";
  }
}
