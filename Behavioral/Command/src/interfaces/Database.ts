// Command Pattern — Receiver interface
// Declares the low-level operations that ConcreteCommands call on the Receiver.

import { Data } from "../types/Data";

/**
 * Receiver interface that ApplicationDatabase implements.
 * ConcreteCommands hold a reference to this interface and call insert/delete
 * during execute() and undo() respectively.
 */
export interface Database {
  insert(data: Data): void;
  delete(data: Data): void;
}
