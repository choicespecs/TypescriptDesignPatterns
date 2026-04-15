// Factory Method Pattern — Abstract Product
// Declares the display() factory method that each concrete page type must implement.

/**
 * Abstract Product in the Factory Method pattern.
 * Provides shared displayImage() and displayArticle() helpers; concrete subclasses
 * (DefaultWebPage, ContentWebPage, SecurityWebPage, ServiceWebPage) implement display()
 * to choose which content to render for their HTTP response code.
 */
export abstract class WebPage {
  protected userContent: HTMLElement;
  protected userArticle: HTMLElement;
  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    this.userContent = userContent;
    this.userArticle = userArticle;
  }

  /** Shared helper: renders an <img> tag into the content DOM element. */
  displayImage(path: string) {
    this.userContent.innerHTML = `<img src = '${path}' />`;
  }

  /** Shared helper: renders a <p> tag into the article DOM element. */
  displayArticle(article: string) {
    this.userArticle.innerHTML = `<p>${article}</p>`;
  }

  /** Factory method hook: each subclass decides which image and article to show. */
  abstract display(): void;
}
