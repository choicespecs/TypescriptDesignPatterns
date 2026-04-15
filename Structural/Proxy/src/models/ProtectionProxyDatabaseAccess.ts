// Proxy Pattern — Protection Proxy
// Acts as a gatekeeper in front of RealDatabaseAccess.
// On construction it checks user.writeAccess; only if access is granted does it
// instantiate the real subject. writeData() performs a second check before delegating,
// so revoked access is respected even after the proxy is constructed.

import { DatabaseAccess } from "../interfaces/DatabaseAccess";
import { RealDatabaseAccess } from "./RealDatabaseAccess";
import { User } from "./User";

/**
 * Protection Proxy — controls access to RealDatabaseAccess based on user permissions.
 *
 * Construction-time check: creates RealDatabaseAccess only when access is allowed.
 * Call-time check: verifies access again in writeData() to handle permission changes.
 * Client code calls writeData() on this proxy exactly as it would on the real subject.
 */
export class ProtectionProxyDatabaseAccess implements DatabaseAccess {
  private realDatabaseAccess: DatabaseAccess | null = null;

  constructor(private user: User, private data: string) {
    if (user.writeAccess) {
      // Access granted — instantiate the real subject now
      this.realDatabaseAccess = new RealDatabaseAccess(data);
      console.log("User has write access");
    } else {
      console.log("User does not have write access");
    }
  }

  writeData() {
    // Double-check: access could have been revoked between construction and this call
    if (this.realDatabaseAccess && this.user.writeAccess) {
      this.realDatabaseAccess.writeData(); // Delegate to the real subject
      console.log("Proxy write into database");
    }
  }
}
