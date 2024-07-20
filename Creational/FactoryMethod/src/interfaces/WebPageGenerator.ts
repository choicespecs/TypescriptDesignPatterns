import { HTTPResponse } from "../types/HTTPResponse";
import { WebPage } from "./WebPage";

export abstract class WebPageGenerator {
  protected userContent: HTMLElement;
  protected userArticle: HTMLElement;

  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    this.userContent = userContent;
    this.userArticle = userArticle;
  }

  abstract createWebPage(response: HTTPResponse): WebPage;
}
