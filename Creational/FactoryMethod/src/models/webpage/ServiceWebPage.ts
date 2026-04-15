// Factory Method Pattern — ConcreteProduct (503 Service Unavailable page)
// Renders the response content with a service-error context.

import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";

/**
 * ConcreteProduct for the 503 Service Unavailable response.
 * Like ContentWebPage it displays the response's content and article,
 * but it is created by SecurityWebPageResponse and triggers a different client-side log.
 */
export class ServiceWebPage extends WebPage {
  constructor(
    private response: HTTPResponse,
    userContent: HTMLElement,
    userArticle: HTMLElement
  ) {
    super(userContent, userArticle);
  }

  /** Renders the response's image and article even for service-error codes. */
  display() {
    this.displayImage(this.response.content!);
    this.displayArticle(this.response.article!);
  }
}
