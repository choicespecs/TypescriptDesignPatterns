// Abstract Factory Pattern — ConcreteFactory (image theme family)
// Creates coordinated ImageNavigation, ImageWindow, and ImageContent products.

import { DisplayThemeGenerator } from "../../interfaces/DisplayThemeGenerator";
import { ImageNavigation } from "./ImageNavigation";
import { ImageContent } from "./ImageContent";
import { ImageWindow } from "./ImageWindow";

/**
 * ConcreteFactory for the image-based UI theme.
 * Produces the image product family; swapping this for TextTheme changes the
 * entire UI to the text family without any changes to the client.
 */
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
