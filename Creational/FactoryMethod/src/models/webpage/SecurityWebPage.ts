import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";

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

  display() {
    this.displayImage(this.securityImg);
    this.displayArticle(this.securityWarning);
  }
}
