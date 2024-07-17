import { WebPageGenerator } from "../../interfaces/WebPageGenerator";
import { HTTPResponse } from "../../types/HTTPResponse";
import { WebPage } from "../../interfaces/WebPage";
import { DefaultWebPage } from "../webpage/DefaultWebPage";
import { ContentWebPage } from "../webpage/ContentWebPage";

export class ContentWebPageResponse extends WebPageGenerator {
  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    super(userContent, userArticle);
  }
  createWebPage(response: HTTPResponse): WebPage {
    if (response.code === 404) {
      return new DefaultWebPage(this.userContent, this.userArticle);
    } else {
      return new ContentWebPage(response, this.userContent, this.userArticle);
    }
  }
}
