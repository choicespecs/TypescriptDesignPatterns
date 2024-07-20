export class User {
  constructor(private _writeAccess: boolean) {}

  get writeAccess() {
    return this._writeAccess;
  }

  set writeAccess(access: boolean) {
    this._writeAccess = access;
  }
}
