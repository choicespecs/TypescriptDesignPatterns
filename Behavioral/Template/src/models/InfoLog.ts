// Template Method Pattern — ConcreteClass (info severity)
// Provides the INFO-level notify() hook; inherits the log() template from LogTemplate.

import { LogTemplate } from "./LogTemplate";

const logWindow = document?.querySelector(".log");

/**
 * ConcreteClass for the INFO log level.
 * Only overrides notify() to output the INFO severity label;
 * the rest of the logging algorithm is inherited from LogTemplate.
 */
export class InfoLog extends LogTemplate {
  /** Hook implementation: appends the "INFO: LOGGED" label before the log message. */
  protected notify(): void {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("INFO: LOGGED"));
    logWindow?.appendChild(li);
  }
}
