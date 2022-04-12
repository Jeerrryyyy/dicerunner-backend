export class JoinLobbyDto {
  private _lobbyCode: string;
  private _username: string;

  constructor(lobbyCode: string, username: string) {
    this._lobbyCode = lobbyCode;
    this._username = username;
  }

  get lobbyCode(): string {
    return this._lobbyCode;
  }

  set lobbyCode(value: string) {
    this._lobbyCode = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
