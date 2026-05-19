// Abstract Factory Pattern — ConcreteProduct (text-theme content area)
// Fills the content area with Lorem Ipsum paragraphs when display() is called.

import { DisplayContent } from "../../interfaces/DisplayContent";

/**
 * ConcreteProduct for the text-theme content area.
 * Implements DisplayContent.display() by injecting Lorem Ipsum HTML paragraphs.
 * Created exclusively by TextTheme — completes the Text product family.
 */
export class TextContent implements DisplayContent {
  private themeContent: HTMLElement;

  constructor(themeContent: HTMLElement) {
    this.themeContent = themeContent;
  }
  display() {
    this.themeContent.style.padding = "2em";
    this.themeContent.style.color = "#2d1a1e";
    this.themeContent.innerHTML = `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, at vero. Totam facere error ducimus suscipit sint, ea, alias possimus rerum expedita, dolor perspiciatis sapiente maiores vel quis velit facilis?<p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, at vero. Totam facere error ducimus suscipit sint, ea, alias possimus rerum expedita, dolor perspiciatis sapiente maiores vel quis velit facilis?<p>`;
  }
}
