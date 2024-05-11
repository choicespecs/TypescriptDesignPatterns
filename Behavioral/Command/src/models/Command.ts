import { Data, ApplicationDatabase } from "./Database";

export interface Command {
  execute(): any;
  undo(): any;
}

export class InsertDatabase implements Command {
  constructor(private database: ApplicationDatabase, private data: Data) {}

  execute() {
    this.database.insert(this.data);
  }

  undo() {
    this.database.delete(this.data);
  }
}

export class DeleteDatabase implements Command {
  constructor(private database: ApplicationDatabase, private data: Data) {}

  execute() {
    this.database.delete(this.data);
  }

  undo() {
    this.database.insert(this.data);
  }
}
