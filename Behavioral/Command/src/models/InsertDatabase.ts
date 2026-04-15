// Command Pattern — ConcreteCommand (insert)
// Encapsulates a database insert operation and its inverse (delete) for undo support.

import { Command } from "../interfaces/Command";
import { ApplicationDatabase } from "./ApplicationDatabase";
import { Data } from "../types/Data";

/**
 * ConcreteCommand that wraps an insert operation on the Receiver (ApplicationDatabase).
 * Stores enough context (the data record) to reverse the action via undo().
 */
export class InsertDatabase implements Command {
  constructor(private database: ApplicationDatabase, private data: Data) {}

  execute() {
    this.database.insert(this.data); // Delegate the real work to the Receiver
  }

  undo() {
    this.database.delete(this.data); // Reverse by deleting the same record
  }
}
