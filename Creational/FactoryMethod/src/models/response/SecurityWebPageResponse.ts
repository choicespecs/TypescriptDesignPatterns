// Factory Method Pattern — ConcreteCreator (security/service response handler)
// Creates SecurityWebPage for 511 and ServiceWebPage for 503; logs each incident.

import { WebPageGenerator } from "../../interfaces/WebPageGenerator";
import { WebPage } from "../../interfaces/WebPage";
import { HTTPResponse } from "../../types/HTTPResponse";
import { SecurityWebPage } from "../webpage/SecurityWebPage";
import { ServiceWebPage } from "../webpage/ServiceWebPage";

/**
 * ConcreteCreator for security and service-error responses.
 * Logs every incident and returns a SecurityWebPage (511 auth required)
 * or ServiceWebPage (503 service unavailable) based on the response code.
 */
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

  /** Records each security/service incident with a timestamp for audit purposes. */
  private logger(response: HTTPResponse, tag: number) {
    const date = this.getDate();
    if (tag === 0) {
      this.log.push(`CODE: ${response.code}, DATE: ${date}`);
    } else {
      this.log.push(`SECURITY WARNING, CODE: ${response.code}, DATE: ${date}`);
    }
    console.log(this.log);
  }

  /** Factory method implementation: logs the incident and selects the correct security page. */
  createWebPage(response: HTTPResponse): WebPage {
    if (response.code === 511) {
      this.logger(response, -1); // Tag -1 → security warning log entry
      return new SecurityWebPage(response, this.userContent, this.userArticle);
    } else {
      this.logger(response, 0); // Tag 0 → standard service-error log entry
      return new ServiceWebPage(response, this.userContent, this.userArticle);
    }
  }
}
