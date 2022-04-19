export class GameModel {
  private _startTime: number;
  private _endTime: number;
  private _maxScore: number;
  private _started: boolean;
  private _winner: string;

  constructor(startTime: number, endTime: number, maxScore: number, started: boolean, winner: string) {
    this._startTime = startTime;
    this._endTime = endTime;
    this._maxScore = maxScore;
    this._started = started;
    this._winner = winner;
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

  get started(): boolean {
    return this._started;
  }

  set started(value: boolean) {
    this._started = value;
  }

  get winner(): string {
    return this._winner;
  }

  set winner(value: string) {
    this._winner = value;
  }
}
