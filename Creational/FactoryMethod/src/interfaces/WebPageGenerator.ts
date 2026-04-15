// Factory Method Pattern — Abstract Creator
// Declares createWebPage() — the factory method subclasses must implement.

import { HTTPResponse } from "../types/HTTPResponse";
import { WebPage } from "./WebPage";

/**
 * Abstract Creator in the Factory Method pattern.
 * Subclasses (ContentWebPageResponse, SecurityWebPageResponse) override createWebPage()
 * to instantiate the appropriate WebPage subclass based on the HTTP response code.
 */
export abstract class WebPageGenerator {
  protected userContent: HTMLElement;
  protected userArticle: HTMLElement;

  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    this.userContent = userContent;
    this.userArticle = userArticle;
  }

  /** Factory method — subclasses determine which concrete WebPage to create. */
  abstract createWebPage(response: HTTPResponse): WebPage;
}
