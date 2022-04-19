export class EndGameDto {
  private _lobbyCode: string;
  private _winner: string;

  constructor(lobbyCode: string, winner: string) {
    this._lobbyCode = lobbyCode;
    this._winner = winner;
  }

  get lobbyCode(): string {
    return this._lobbyCode;
  }

  set lobbyCode(value: string) {
    this._lobbyCode = value;
  }

  get winner(): string {
    return this._winner;
  }

  set winner(value: string) {
    this._winner = value;
  }
}
