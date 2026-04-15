// Factory Method Pattern — ConcreteProduct (404 fallback page)
// Displayed when the HTTP response code is 404 (Not Found).

import { WebPage } from "../../interfaces/WebPage";

/**
 * ConcreteProduct for the 404 Not Found response.
 * Shows a default company image and article; created by ContentWebPageResponse.
 */
export class DefaultWebPage extends WebPage {
  private defaultImg = "./images/default.jpg";
  private defaultArticle =
    "TECHCO: Recent Innovations have created the most innovative technologies for the 21st century";

  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    super(userContent, userArticle);
  }

  /** Renders hardcoded fallback content using inherited displayImage/displayArticle helpers. */
  display() {
    this.displayImage(this.defaultImg);
    this.displayArticle(this.defaultArticle);
  }
}
