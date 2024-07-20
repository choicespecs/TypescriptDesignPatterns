import { ApplicationDatabase } from "./ApplicationDatabase";
import { Command } from "../interfaces/Command";
import { Data } from "../types/Data";

export class DeleteDatabase implements Command {
  constructor(private database: ApplicationDatabase, private data: Data) {}

  execute() {
    this.database.delete(this.data);
  }

  undo() {
    this.database.insert(this.data);
  }
}
