import { DisplayContent } from "../../interfaces/DisplayContent";

export class TextContent implements DisplayContent {
  private themeContent: HTMLElement;

  constructor(themeContent: HTMLElement) {
    this.themeContent = themeContent;
  }
  display() {
    this.themeContent.style.padding = "2em";
    this.themeContent.innerHTML = `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, at vero. Totam facere error ducimus suscipit sint, ea, alias possimus rerum expedita, dolor perspiciatis sapiente maiores vel quis velit facilis?<p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, at vero. Totam facere error ducimus suscipit sint, ea, alias possimus rerum expedita, dolor perspiciatis sapiente maiores vel quis velit facilis?<p>`;
  }
}
