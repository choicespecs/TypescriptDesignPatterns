// Command Pattern — ConcreteCommand (delete)
// Encapsulates a database delete operation and its inverse (insert) for undo support.

import { ApplicationDatabase } from "./ApplicationDatabase";
import { Command } from "../interfaces/Command";
import { Data } from "../types/Data";

/**
 * ConcreteCommand that wraps a delete operation on the Receiver (ApplicationDatabase).
 * The inverse of InsertDatabase: execute() removes a record and undo() re-inserts it.
 */
export class DeleteDatabase implements Command {
  constructor(private database: ApplicationDatabase, private data: Data) {}

  execute() {
    this.database.delete(this.data); // Delegate the real work to the Receiver
  }

  undo() {
    this.database.insert(this.data); // Reverse by re-inserting the deleted record
  }
}
