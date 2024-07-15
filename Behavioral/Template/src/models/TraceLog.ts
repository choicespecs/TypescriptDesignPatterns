import { LogTemplate } from "./LogTemplate";

const logWindow = document?.querySelector(".log");

export class TraceLog extends LogTemplate {
  protected notify(): void {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("TRACE: LOGGED"));
    logWindow?.appendChild(li);
  }
}
