import { UserModel } from './user.model';
import { GameModel } from './game.model';

export class LobbyModel {
  private _idCode: string;
  private _owner: UserModel;
  private _users: UserModel[];
  private _creationMillis: number;
  private _game: GameModel;

  constructor(idCode: string, owner: UserModel, users: UserModel[], creationMillis: number, game: GameModel) {
    this._idCode = idCode;
    this._owner = owner;
    this._users = users;
    this._creationMillis = creationMillis;
    this._game = game;
  }

  get idCode(): string {
    return this._idCode;
  }

  set idCode(value: string) {
    this._idCode = value;
  }

  get owner(): UserModel {
    return this._owner;
  }

  set owner(value: UserModel) {
    this._owner = value;
  }

  get users(): UserModel[] {
    return this._users;
  }

  set users(value: UserModel[]) {
    this._users = value;
  }

  get creationMillis(): number {
    return this._creationMillis;
  }

  set creationMillis(value: number) {
    this._creationMillis = value;
  }

  get game(): GameModel {
    return this._game;
  }

  set game(value: GameModel) {
    this._game = value;
  }
}
