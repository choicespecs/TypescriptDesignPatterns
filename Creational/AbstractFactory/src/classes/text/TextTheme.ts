// Abstract Factory Pattern — ConcreteFactory (text theme family)
// Creates coordinated TextNavigation, TextWindow, and TextContent products.

import { DisplayThemeGenerator } from "../../interfaces/DisplayThemeGenerator";
import { TextNavigation } from "./TextNavigation";
import { TextWindow } from "./TextWindow";
import { TextContent } from "./TextContent";

/**
 * ConcreteFactory for the text-based UI theme.
 * Instantiates the text product family; the client can swap in ImageTheme to get
 * a completely different look without changing any product-consuming code.
 */
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

  /** Returns the Text-family navigation product. */
  createNavigation(): TextNavigation {
    return new TextNavigation(this.themeNav);
  }
  /** Returns the Text-family window product. */
  createWindow(): TextWindow {
    return new TextWindow(this.themeWindow);
  }
  /** Returns the Text-family content product. */
  createContent(): TextContent {
    return new TextContent(this.themeContent);
  }
}
