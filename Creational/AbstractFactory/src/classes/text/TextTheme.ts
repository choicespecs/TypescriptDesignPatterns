import { DisplayThemeGenerator } from "../../interfaces/DisplayThemeGenerator";
import { TextNavigation } from "./TextNavigation";
import { TextWindow } from "./TextWindow";
import { TextContent } from "./TextContent";

export class TextTheme implements DisplayThemeGenerator {
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

  createNavigation(): TextNavigation {
    return new TextNavigation(this.themeNav);
  }
  createWindow(): TextWindow {
    return new TextWindow(this.themeWindow);
  }
  createContent(): TextContent {
    return new TextContent(this.themeContent);
  }
}
