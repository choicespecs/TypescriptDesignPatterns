import { WebPage } from "../../interfaces/WebPage";

export class DefaultWebPage extends WebPage {
  private defaultImg = "./images/default.jpg";
  private defaultArticle =
    "TECHCO: Recent Innovations have created the most innovative technologies for the 21st century";

  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    super(userContent, userArticle);
  }

  display() {
    this.displayImage(this.defaultImg);
    this.displayArticle(this.defaultArticle);
  }
}
