import { ApplicationDatabase } from "./ApplicationDatabase";
import { Command } from "../interfaces/Command";
import { Data } from "../types/Data";
import { DeleteDatabase } from "./DeleteDatabase";
import { InsertDatabase } from "./InsertDatabase";

export class DatabaseApplication {
  private commandList: Command[] = [];

  constructor(private database: ApplicationDatabase) {}

  insert(data: Data) {
    const command = new InsertDatabase(this.database, data);
    this.commandList.push(command);
    command.execute();
  }

  delete(data: Data) {
    const command = new DeleteDatabase(this.database, data);
    this.commandList.push(command);
    command.execute();
  }

  undo() {
    const command = this.commandList.pop();
    command?.undo();
  }
}
