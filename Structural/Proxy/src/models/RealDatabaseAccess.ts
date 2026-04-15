// Proxy Pattern — Real Subject
// Performs the actual database write. Never instantiated directly by client code —
// always created and called through ProtectionProxyDatabaseAccess.
// Calls window.insertDatabase (defined in index.ts) to append the record to the DOM list.
// The window indirection is required because RealDatabaseAccess lives in a separate webpack
// module and cannot import index.ts functions directly.

import { DatabaseAccess } from "../interfaces/DatabaseAccess";

/**
 * Real Subject — executes the actual write operation.
 * Protected by the proxy; should not be instantiated outside ProtectionProxyDatabaseAccess.
 */
export class RealDatabaseAccess implements DatabaseAccess {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  writeData() {
    // Cross-module call: insertDatabase is exposed on window by index.ts
    (window as any).insertDatabase(this.data);
    console.log("Real write into database");
  }
}
