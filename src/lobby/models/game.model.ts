export class GameModel {
  private _startTime: number;
  private _endTime: number;
  private _maxScore: number;
  private _gameStarted: boolean;
  private _gameWinner: string;

  constructor(startTime: number, endTime: number, maxScore: number, gameStarted: boolean, gameWinner: string) {
    this._startTime = startTime;
    this._endTime = endTime;
    this._maxScore = maxScore;
    this._gameStarted = gameStarted;
    this._gameWinner = gameWinner;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(value: number) {
    this._startTime = value;
  }

  get endTime(): number {
    return this._endTime;
  }

  set endTime(value: number) {
    this._endTime = value;
  }

  get maxScore(): number {
    return this._maxScore;
  }

  set maxScore(value: number) {
    this._maxScore = value;
  }

  get gameStarted(): boolean {
    return this._gameStarted;
  }

  set gameStarted(value: boolean) {
    this._gameStarted = value;
  }

  get gameWinner(): string {
    return this._gameWinner;
  }

  set gameWinner(value: string) {
    this._gameWinner = value;
  }
}
