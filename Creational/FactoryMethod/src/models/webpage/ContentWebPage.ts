// Factory Method Pattern — ConcreteProduct (200 OK content page)
// Renders the image and article from the HTTP response payload.

import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";

/**
 * ConcreteProduct for a successful 200 OK response.
 * Displays the content (image URL) and article from the response object.
 * Created by ContentWebPageResponse when the response code is not 404.
 */
export class ContentWebPage extends WebPage {
  constructor(
    private response: HTTPResponse,
    userContent: HTMLElement,
    userArticle: HTMLElement
  ) {
    super(userContent, userArticle);
  }

  /** Displays the response's image and article using inherited helpers. */
  display() {
    this.displayImage(this.response.content!);
    this.displayArticle(this.response.article!);
  }
}
