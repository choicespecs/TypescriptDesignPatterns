// Template Method Pattern — ConcreteClass (error severity)
// Overrides both notify() and the highTierNotify() hook for escalated error handling.

import { LogTemplate } from "./LogTemplate";

const logWindow = document?.querySelector(".log");

/**
 * ConcreteClass for the ERROR log level.
 * Overrides notify() for the ERROR label AND overrides the highTierNotify() hook
 * to trigger an additional console warning — the only subclass that uses this hook.
 */
export class ErrorLog extends LogTemplate {
  /** Hook implementation: appends the "ERROR: LOGGED" severity label. */
  protected notify(): void {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("ERROR: LOGGED"));
    logWindow?.appendChild(li);
  }

  /** Overrides the optional hook to fire a high-priority alert after saving the log entry. */
  protected highTierNotify() {
    console.log("DANGER: ERROR HAS BEEN DETECTED");
  }
}
