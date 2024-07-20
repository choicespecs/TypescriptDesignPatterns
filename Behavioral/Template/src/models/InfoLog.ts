import { LogTemplate } from "./LogTemplate";

const logWindow = document?.querySelector(".log");

export class InfoLog extends LogTemplate {
  protected notify(): void {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("INFO: LOGGED"));
    logWindow?.appendChild(li);
  }
}
