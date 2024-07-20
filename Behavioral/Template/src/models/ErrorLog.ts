import { LogTemplate } from "./LogTemplate";

const logWindow = document?.querySelector(".log");

export class ErrorLog extends LogTemplate {
  protected notify(): void {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("ERROR: LOGGED"));
    logWindow?.appendChild(li);
  }

  protected highTierNotify() {
    console.log("DANGER: ERROR HAS BEEN DETECTED");
  }
}
