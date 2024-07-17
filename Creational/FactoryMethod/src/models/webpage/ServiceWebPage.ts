import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";

export class ServiceWebPage extends WebPage {
  constructor(
    private response: HTTPResponse,
    userContent: HTMLElement,
    userArticle: HTMLElement
  ) {
    super(userContent, userArticle);
  }

  display() {
    this.displayImage(this.response.content!);
    this.displayArticle(this.response.article!);
  }
}
