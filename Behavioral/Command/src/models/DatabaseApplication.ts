// Command Pattern — Invoker
// Creates command objects, stores them in a history stack, and supports undo.

import { ApplicationDatabase } from "./ApplicationDatabase";
import { Command } from "../interfaces/Command";
import { Data } from "../types/Data";
import { DeleteDatabase } from "./DeleteDatabase";
import { InsertDatabase } from "./InsertDatabase";

/**
 * Invoker in the Command pattern.
 * Clients call insert() or delete() here; DatabaseApplication wraps each call
 * in a Command object, pushes it onto the history stack, and executes it.
 * Undo pops the most recent command and calls its undo() method.
 */
export class DatabaseApplication {
  /** History stack — commands are pushed on execute and popped on undo. */
  private commandList: Command[] = [];

  constructor(private database: ApplicationDatabase) {}

  insert(data: Data) {
    const command = new InsertDatabase(this.database, data);
    this.commandList.push(command); // Record command before executing it
    command.execute();
  }

  delete(data: Data) {
    const command = new DeleteDatabase(this.database, data);
    this.commandList.push(command);
    command.execute();
  }

  undo() {
    const command = this.commandList.pop(); // Retrieve and remove the last command
    command?.undo(); // Reverse the operation via the command's undo() method
  }
}
