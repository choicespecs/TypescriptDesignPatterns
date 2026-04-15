// Factory Method Pattern — Top-level ConcreteCreator (routing factory)
// Delegates to ContentWebPageResponse or SecurityWebPageResponse based on the response code.

import { ContentWebPageResponse } from "./ContentWebPageResponse";
import { SecurityWebPageResponse } from "./SecurityWebPageResponse";
import { HTTPResponse } from "../../types/HTTPResponse";
import { WebPage } from "../../interfaces/WebPage";
import { WebPageGenerator } from "../../interfaces/WebPageGenerator";

/**
 * Top-level ConcreteCreator that routes page creation between two sub-factories.
 * Codes 503/511 are forwarded to SecurityWebPageResponse; all others go to ContentWebPageResponse.
 * This keeps each sub-factory focused on its own response category.
 */
export class HTTPWebResponse extends WebPageGenerator {
  private contentResponse: ContentWebPageResponse;
  private securityResponse: SecurityWebPageResponse;

  constructor(
    contentResponse: ContentWebPageResponse,
    securityResponse: SecurityWebPageResponse,
    userContent: HTMLElement,
    userArticle: HTMLElement
  ) {
    super(userContent, userArticle);
    this.contentResponse = contentResponse;
    this.securityResponse = securityResponse;
  }

  /** Delegates to the appropriate sub-factory based on the HTTP status code. */
  createWebPage(response: HTTPResponse): WebPage {
    let USER_PAGE_RESPONSE!: WebPage;
    switch (response.code) {
      case 503:
      case 511: {
        // Security/service issues routed to security factory
        USER_PAGE_RESPONSE = this.securityResponse.createWebPage(response);
        break;
      }
      default: {
        // Normal or not-found codes routed to content factory
        USER_PAGE_RESPONSE = this.contentResponse.createWebPage(response);
        break;
      }
    }
    return USER_PAGE_RESPONSE;
  }
}
