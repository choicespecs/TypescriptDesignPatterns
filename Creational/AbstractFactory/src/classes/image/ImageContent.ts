// Abstract Factory Pattern — ConcreteProduct (image-theme content area)
// Injects an Unsplash photo when display() is called.

import { DisplayContent } from "../../interfaces/DisplayContent";

/**
 * ConcreteProduct for the image-theme content area.
 * Implements DisplayContent.display() by rendering a remote image instead of text.
 * Created exclusively by ImageTheme — completes the Image product family.
 */
export class ImageContent implements DisplayContent {
  private themeContent: HTMLElement;

  constructor(themeContent: HTMLElement) {
    this.themeContent = themeContent;
  }

  display() {
    // Inject an Unsplash image — the Image-family counterpart to TextContent's Lorem Ipsum
    this.themeContent.innerHTML = `<img src='https://images.unsplash.com/photo-1653221651798-cdf2780f9c9e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'>`;
  }
}
