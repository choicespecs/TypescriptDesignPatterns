// Factory Method Pattern — ConcreteCreator (content response handler)
// Creates DefaultWebPage for 404 and ContentWebPage for 200 responses.

import { WebPageGenerator } from "../../interfaces/WebPageGenerator";
import { HTTPResponse } from "../../types/HTTPResponse";
import { WebPage } from "../../interfaces/WebPage";
import { DefaultWebPage } from "../webpage/DefaultWebPage";
import { ContentWebPage } from "../webpage/ContentWebPage";

/**
 * ConcreteCreator for content-type responses.
 * Implements the factory method to return a DefaultWebPage (404 fallback)
 * or ContentWebPage (200 success) depending on the response code.
 */
export class ContentWebPageResponse extends WebPageGenerator {
  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    super(userContent, userArticle);
  }
  /** Factory method implementation: selects the correct product for 404 vs 200. */
  createWebPage(response: HTTPResponse): WebPage {
    if (response.code === 404) {
      return new DefaultWebPage(this.userContent, this.userArticle); // Not found — show default page
    } else {
      return new ContentWebPage(response, this.userContent, this.userArticle); // Success — show response content
    }
  }
}
