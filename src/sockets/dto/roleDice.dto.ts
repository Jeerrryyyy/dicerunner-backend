export class RoleDiceDto {
  private _lobbyCode: string;
  private _diceCount: number;

  constructor(lobbyCode: string, diceCount: number) {
    this._lobbyCode = lobbyCode;
    this._diceCount = diceCount;
  }

  get lobbyCode(): string {
    return this._lobbyCode;
  }

  set lobbyCode(value: string) {
    this._lobbyCode = value;
  }

  get diceCount(): number {
    return this._diceCount;
  }

  set diceCount(value: number) {
    this._diceCount = value;
  }
}
