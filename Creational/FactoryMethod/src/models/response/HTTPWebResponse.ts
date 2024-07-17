import { ContentWebPageResponse } from "./ContentWebPageResponse";
import { SecurityWebPageResponse } from "./SecurityWebPageResponse";
import { HTTPResponse } from "../../types/HTTPResponse";
import { WebPage } from "../../interfaces/WebPage";
import { WebPageGenerator } from "../../interfaces/WebPageGenerator";

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

  createWebPage(response: HTTPResponse): WebPage {
    let USER_PAGE_RESPONSE!: WebPage;
    switch (response.code) {
      case 503:
      case 511: {
        USER_PAGE_RESPONSE = this.securityResponse.createWebPage(response);
        break;
      }
      default: {
        USER_PAGE_RESPONSE = this.contentResponse.createWebPage(response);
        break;
      }
    }
    return USER_PAGE_RESPONSE;
  }
}
