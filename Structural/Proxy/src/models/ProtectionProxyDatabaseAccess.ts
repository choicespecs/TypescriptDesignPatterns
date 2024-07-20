import { DatabaseAccess } from "../interfaces/DatabaseAccess";
import { RealDatabaseAccess } from "./RealDatabaseAccess";
import { User } from "./User";

export class ProtectionProxyDatabaseAccess implements DatabaseAccess {
  private realDatabaseAccess: DatabaseAccess | null = null;

  constructor(private user: User, private data: string) {
    if (user.writeAccess) {
      this.realDatabaseAccess = new RealDatabaseAccess(data);
      console.log("User has write access");
    } else {
      console.log("User does not have write access");
    }
  }

  writeData() {
    if (this.realDatabaseAccess && this.user.writeAccess) {
      this.realDatabaseAccess.writeData();
      console.log("Proxy write into database");
    }
  }
}
