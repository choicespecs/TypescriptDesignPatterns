import { WebPageGenerator } from "../../interfaces/WebPageGenerator";
import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";
import { SecurityWebPage } from "../webpage/SecurityWebPage";
import { ServiceWebPage } from "../webpage/ServiceWebPage";

export class SecurityWebPageResponse extends WebPageGenerator {
  private log: string[] = [];
  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    super(userContent, userArticle);
  }
  private getDate(): string {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return `${date} ${time}`;
  }

  private logger(response: HTTPResponse, tag: number) {
    const date = this.getDate();
    if (tag === 0) {
      this.log.push(`CODE: ${response.code}, DATE: ${date}`);
    } else {
      this.log.push(`SECURITY WARNING, CODE: ${response.code}, DATE: ${date}`);
    }
    console.log(this.log);
  }
  createWebPage(response: HTTPResponse): WebPage {
    if (response.code === 511) {
      this.logger(response, -1);
      return new SecurityWebPage(response, this.userContent, this.userArticle);
    } else {
      this.logger(response, 0);
      return new ServiceWebPage(response, this.userContent, this.userArticle);
    }
  }
}
