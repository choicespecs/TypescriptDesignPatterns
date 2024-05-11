import { Data, ApplicationDatabase } from "./Database";
import { Command, InsertDatabase, DeleteDatabase } from "./Command";

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
