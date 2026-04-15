// Proxy Pattern — Permission model
// Holds the `writeAccess` flag that the ProtectionProxyDatabaseAccess checks
// before creating or invoking the RealDatabaseAccess.
// Toggling this flag at runtime changes what the proxy allows without
// modifying either the proxy or the real subject.

/** Holds the user's write permission flag, read and toggled by both the UI and the proxy. */
export class User {
  constructor(private _writeAccess: boolean) {}

  get writeAccess() {
    return this._writeAccess;
  }

  set writeAccess(access: boolean) {
    this._writeAccess = access;
  }
}
