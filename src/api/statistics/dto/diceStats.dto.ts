export class DiceStatsDto {
  private _dateMillis: number;
  private _lobbyCode: string;
  private _playerName: string;
  private _rolledNumber: number;

  constructor(dateMillis: number, lobbyCode: string, playerName: string, rolledNumber: number) {
    this._dateMillis = dateMillis;
    this._lobbyCode = lobbyCode;
    this._playerName = playerName;
    this._rolledNumber = rolledNumber;
  }

  get dateMillis(): number {
    return this._dateMillis;
  }

  set dateMillis(value: number) {
    this._dateMillis = value;
  }

  get lobbyCode(): string {
    return this._lobbyCode;
  }

  set lobbyCode(value: string) {
    this._lobbyCode = value;
  }

  get playerName(): string {
    return this._playerName;
  }

  set playerName(value: string) {
    this._playerName = value;
  }

  get rolledNumber(): number {
    return this._rolledNumber;
  }

  set rolledNumber(value: number) {
    this._rolledNumber = value;
  }
}
