import { UserModel } from '../../sockets/models/user.model';

export class LobbyModel {
  private _idCode: string;
  private _owner: UserModel;
  private _users: UserModel[];
  private _creationMillis: number;
  private _gameRunning: boolean;

  constructor(
    idCode: string,
    owner: UserModel,
    users: UserModel[],
    creationMillis: number,
    gameRunning: boolean,
  ) {
    this._idCode = idCode;
    this._owner = owner;
    this._users = users;
    this._creationMillis = creationMillis;
    this._gameRunning = gameRunning;
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

  get gameRunning(): boolean {
    return this._gameRunning;
  }

  set gameRunning(value: boolean) {
    this._gameRunning = value;
  }
}
