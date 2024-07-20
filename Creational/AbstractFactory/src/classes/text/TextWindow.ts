import { DisplayWindow } from "../../interfaces/DisplayWindow";

export class TextWindow implements DisplayWindow {
  private themeWindow: HTMLElement;

  constructor(themeWindow: HTMLElement) {
    this.themeWindow = themeWindow;
  }
  display() {
    this.themeWindow.style.backgroundColor = "pink";
    this.themeWindow.style.width = "300px";
  }
}
