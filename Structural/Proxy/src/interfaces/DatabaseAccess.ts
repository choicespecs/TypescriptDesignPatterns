// Proxy Pattern — Subject interface
// The common contract implemented by both the Real Subject (RealDatabaseAccess)
// and the Proxy (ProtectionProxyDatabaseAccess).
// Client code depends only on this interface, never on the concrete classes directly.

/** Subject interface: both the real subject and proxy implement this contract. */
export interface DatabaseAccess {
  writeData(): void;
}
