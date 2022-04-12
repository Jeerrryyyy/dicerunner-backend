import { Injectable } from '@nestjs/common';
import { LobbyModel } from './models/lobby.model';

@Injectable()
export class LobbyCache {
  private lobbies: Map<string, LobbyModel> = new Map();

  addLobby(lobbyModel: LobbyModel): void {
    this.lobbies.set(lobbyModel.idCode, lobbyModel);
  }

  removeLobby(idCode: string): void {
    this.lobbies.delete(idCode);
  }

  getLobby(idCode: string): LobbyModel {
    return this.lobbies.get(idCode);
  }
}
