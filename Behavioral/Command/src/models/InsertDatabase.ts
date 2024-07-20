import { Command } from "../interfaces/Command";
import { ApplicationDatabase } from "./ApplicationDatabase";
import { Data } from "../types/Data";

export class InsertDatabase implements Command {
  constructor(private database: ApplicationDatabase, private data: Data) {}

  execute() {
    this.database.insert(this.data);
  }

  undo() {
    this.database.delete(this.data);
  }
}
