// Template Method Pattern — Client utility function
// Accepts any LogTemplate subclass and invokes the template method, hiding concrete types from callers.

import { LogTemplate } from "./LogTemplate";

/**
 * Utility function used by index.ts to invoke the template method on any log level.
 * By accepting the abstract type LogTemplate, callers are decoupled from the concrete subclasses.
 */
export function logHelper(logger: LogTemplate, message: string) {
  logger.log(message); // Triggers the template method: notify → saveLog → highTierNotify
}
