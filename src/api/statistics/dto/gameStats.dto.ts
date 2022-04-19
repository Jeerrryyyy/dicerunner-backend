export class GameStatsDto {
  private _lobbyCode: string;
  private _ownerName: string;
  private _playerNames: string[];
  private _lobbyCreatedMillis: number;
  private _gameStartMillis: number;
  private _gameEndMillis: number;
  private _gameStarted: boolean;
  private _gameWinnerName: string;

  constructor(
    lobbyCode: string,
    ownerName: string,
    playerNames: string[],
    lobbyCreatedMillis: number,
    gameStartMillis: number,
    gameEndMillis: number,
    gameStarted: boolean,
    gameWinnerName: string,
  ) {
    this._lobbyCode = lobbyCode;
    this._ownerName = ownerName;
    this._playerNames = playerNames;
    this._lobbyCreatedMillis = lobbyCreatedMillis;
    this._gameStartMillis = gameStartMillis;
    this._gameEndMillis = gameEndMillis;
    this._gameStarted = gameStarted;
    this._gameWinnerName = gameWinnerName;
  }

  get lobbyCode(): string {
    return this._lobbyCode;
  }

  set lobbyCode(value: string) {
    this._lobbyCode = value;
  }

  get ownerName(): string {
    return this._ownerName;
  }

  set ownerName(value: string) {
    this._ownerName = value;
  }

  get playerNames(): string[] {
    return this._playerNames;
  }

  set playerNames(value: string[]) {
    this._playerNames = value;
  }

  get lobbyCreatedMillis(): number {
    return this._lobbyCreatedMillis;
  }

  set lobbyCreatedMillis(value: number) {
    this._lobbyCreatedMillis = value;
  }

  get gameStartMillis(): number {
    return this._gameStartMillis;
  }

  set gameStartMillis(value: number) {
    this._gameStartMillis = value;
  }

  get gameEndMillis(): number {
    return this._gameEndMillis;
  }

  set gameEndMillis(value: number) {
    this._gameEndMillis = value;
  }

  get gameStarted(): boolean {
    return this._gameStarted;
  }

  set gameStarted(value: boolean) {
    this._gameStarted = value;
  }

  get gameWinnerName(): string {
    return this._gameWinnerName;
  }

  set gameWinnerName(value: string) {
    this._gameWinnerName = value;
  }
}
