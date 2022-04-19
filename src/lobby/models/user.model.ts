export class UserModel {
  private _id: string;
  private _name: string;
  private _diceScore: number;

  constructor(id: string, name: string, diceScore: number) {
    this._id = id;
    this._name = name;
    this._diceScore = diceScore;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get diceScore(): number {
    return this._diceScore;
  }

  set diceScore(value: number) {
    this._diceScore = value;
  }
}
