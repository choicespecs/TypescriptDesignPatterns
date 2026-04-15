// Factory Method Pattern — ConcreteProduct (511 Network Authentication Required page)
// Shows a "stop" image and access-denied message; created by SecurityWebPageResponse.

import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";

/**
 * ConcreteProduct for the 511 Network Authentication Required response.
 * Overrides display() with a hardcoded stop image and "Cannot access" warning,
 * ignoring the response payload since access is blocked.
 */
export class SecurityWebPage extends WebPage {
  private securityImg = "./images/stop.jpg";
  private securityWarning = "Cannot access";

  constructor(
    private response: HTTPResponse,
    userContent: HTMLElement,
    userArticle: HTMLElement
  ) {
    super(userContent, userArticle);
  }

  /** Renders the security-block imagery regardless of the response content. */
  display() {
    this.displayImage(this.securityImg);
    this.displayArticle(this.securityWarning);
  }
}
