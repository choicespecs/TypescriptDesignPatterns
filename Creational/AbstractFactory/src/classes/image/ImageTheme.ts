import { DisplayThemeGenerator } from "../../interfaces/DisplayThemeGenerator";
import { ImageNavigation } from "./ImageNavigation";
import { ImageContent } from "./ImageContent";
import { ImageWindow } from "./ImageWindow";

export class ImageTheme implements DisplayThemeGenerator {
  private themeNav: HTMLElement;
  private themeWindow: HTMLElement;
  private themeContent: HTMLElement;

  constructor(
    themeNav: HTMLElement,
    themeWindow: HTMLElement,
    themeContent: HTMLElement
  ) {
    this.themeNav = themeNav;
    this.themeWindow = themeWindow;
    this.themeContent = themeContent;
  }

  createNavigation(): ImageNavigation {
    return new ImageNavigation(this.themeNav);
  }
  createWindow(): ImageWindow {
    return new ImageWindow(this.themeWindow);
  }
  createContent(): ImageContent {
    return new ImageContent(this.themeContent);
  }
}
