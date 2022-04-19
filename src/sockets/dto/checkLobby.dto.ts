export class CheckLobbyDto {
  private _exists: boolean;

  constructor(exists: boolean) {
    this._exists = exists;
  }

  get exists(): boolean {
    return this._exists;
  }

  set exists(value: boolean) {
    this._exists = value;
  }
}
