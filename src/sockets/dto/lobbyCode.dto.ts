export class LobbyCodeDto {
  private _lobbyCode: string;

  constructor(lobbyCode: string) {
    this._lobbyCode = lobbyCode;
  }

  get lobbyCode(): string {
    return this._lobbyCode;
  }

  set lobbyCode(value: string) {
    this._lobbyCode = value;
  }
}
