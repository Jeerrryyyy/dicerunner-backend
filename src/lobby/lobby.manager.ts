import { LobbyModel } from './models/lobby.model';
import { createRandomId } from '../utils/utils';
import { UserModel } from '../sockets/models/user.model';
import { CreateLobbyDto } from '../sockets/dto/createLobby.dto';
import { Server, Socket } from 'socket.io';
import { JoinLobbyDto } from '../sockets/dto/joinLobby.dto';

export class LobbyManager {
  private lobbies: Map<string, LobbyModel> = new Map();

  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  createLobby(data: CreateLobbyDto, client: Socket): LobbyModel {
    const generatedId = createRandomId(10);

    this.checkForUserOccurrencesAndDestroy(client.id, generatedId);

    const lobbyModel: LobbyModel = new LobbyModel(
      generatedId,
      new UserModel(client.id, data.username),
      [],
      Date.now(),
      false,
    );

    this.addLobby(lobbyModel);
    this.joinLobbySocketRoom(lobbyModel.idCode, client);

    return lobbyModel;
  }

  joinLobby(data: JoinLobbyDto, client: Socket): LobbyModel {
    const lobbyModel: LobbyModel = this.getLobby(data.lobbyCode);
    this.checkForUserOccurrencesAndDestroy(client.id, data.lobbyCode);

    lobbyModel.users.push(new UserModel(client.id, data.username));

    this.replaceLobby(data.lobbyCode, lobbyModel);
    this.joinLobbySocketRoom(lobbyModel.idCode, client);

    return lobbyModel;
  }

  private joinLobbySocketRoom(id: string, client: Socket) {
    client.join(id);
  }

  private checkForUserOccurrencesAndDestroy(id: string, lobbyCode: string): void {
    const lobbiesOfUser: LobbyModel[] = this.getLobbiesOfUser(id);

    if (lobbiesOfUser.length == 0) {
      return;
    }

    lobbiesOfUser.forEach((value) => {
      if (value.owner.id == id) {
        this.removeLobby(value.idCode);

        this.server.to(value.idCode).emit('destroyLobby');
      } else {
        if (value.idCode != lobbyCode) {
          const index = value.users.findIndex((value1) => value1.id == id);

          value.users.splice(index, 1);

          this.replaceLobby(value.idCode, value);
        }
      }
    });
  }

  private getLobbiesOfUser(id: string): LobbyModel[] {
    return Array.from(this.lobbies.values()).filter(
      (value) => value.owner.id == id || value.users.filter((value1) => value1.id == id),
    );
  }

  private replaceLobby(idCode: string, lobbyModel: LobbyModel): void {
    this.removeLobby(idCode);
    this.addLobby(lobbyModel);

    this.server.to(idCode).emit('updateLobby', lobbyModel);
  }

  private addLobby(lobbyModel: LobbyModel): void {
    this.lobbies.set(lobbyModel.idCode, lobbyModel);
  }

  private removeLobby(idCode: string): void {
    this.lobbies.delete(idCode);
  }

  private getLobby(idCode: string): LobbyModel {
    return this.lobbies.get(idCode);
  }
}
