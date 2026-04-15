// Template Method Pattern — ConcreteClass (trace severity)
// Provides the TRACE-level notify() hook; inherits the log() template from LogTemplate.

import { LogTemplate } from "./LogTemplate";

const logWindow = document?.querySelector(".log");

/**
 * ConcreteClass for the TRACE log level.
 * Only overrides notify() to output the TRACE severity label;
 * the rest of the algorithm (saveLog, highTierNotify) is inherited.
 */
export class TraceLog extends LogTemplate {
  /** Hook implementation: appends the "TRACE: LOGGED" label before the log message. */
  protected notify(): void {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("TRACE: LOGGED"));
    logWindow?.appendChild(li);
  }
}
