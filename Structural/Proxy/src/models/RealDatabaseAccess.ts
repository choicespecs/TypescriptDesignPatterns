import { DatabaseAccess } from "../interfaces/DatabaseAccess";

export class RealDatabaseAccess implements DatabaseAccess {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  writeData() {
    insertDatabase(this.data);
    console.log("Real write into database");
  }
}
