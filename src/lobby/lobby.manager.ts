import { LobbyModel } from './models/lobby.model';
import { createRandomId } from '../utils/utils';
import { UserModel } from './models/user.model';
import { CreateLobbyDto } from '../sockets/dto/createLobby.dto';
import { Server, Socket } from 'socket.io';
import { JoinLobbyDto } from '../sockets/dto/joinLobby.dto';
import { GameModel } from './models/game.model';
import { LobbyCodeDto } from '../sockets/dto/lobbyCode.dto';
import { CheckLobbyDto } from '../sockets/dto/checkLobby.dto';
import { RoleDiceDto } from '../sockets/dto/roleDice.dto';
import { EndGameDto } from '../sockets/dto/endGame.dto';

export class LobbyManager {
  private lobbies: Map<string, LobbyModel> = new Map();

  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  checkLobby(data: LobbyCodeDto): CheckLobbyDto {
    const lobbyModel = this.getLobby(data.lobbyCode);

    const checkLobbyDto = new CheckLobbyDto(false);

    if (!lobbyModel) return checkLobbyDto;

    checkLobbyDto.exists = true;

    return checkLobbyDto;
  }

  createLobby(data: CreateLobbyDto, client: Socket): LobbyModel {
    const generatedId = createRandomId(10);

    this.checkForUserOccurrencesAndDestroy(client);

    const lobbyModel = new LobbyModel(
      generatedId,
      new UserModel(client.id, data.username, 0),
      [],
      Date.now(),
      new GameModel(0, 0, 100, false, 'none'),
    );

    this.addLobby(lobbyModel);
    this.joinLobbySocketRoom(lobbyModel.idCode, client);

    return lobbyModel;
  }

  joinLobby(data: JoinLobbyDto, client: Socket): LobbyModel {
    const lobbyModel = this.getLobby(data.lobbyCode);

    this.checkForUserOccurrencesAndDestroy(client);

    lobbyModel.users.push(new UserModel(client.id, data.username, 0));

    this.replaceLobby(data.lobbyCode, lobbyModel);
    this.joinLobbySocketRoom(lobbyModel.idCode, client);

    return lobbyModel;
  }

  clientDisconnect(client: Socket): void {
    this.checkForUserOccurrencesAndDestroy(client);
  }

  startGame(data: LobbyCodeDto): void {
    const lobbyModel = this.getLobby(data.lobbyCode);

    lobbyModel.game.startTime = Date.now();
    lobbyModel.game.started = true;

    this.replaceLobby(lobbyModel.idCode, lobbyModel);
  }

  roleDice(data: RoleDiceDto, client: Socket): void {
    const lobbyModel = this.getLobby(data.lobbyCode);

    const userModel = lobbyModel.users.find((value) => value.id == client.id);
    const index = lobbyModel.users.findIndex((value) => value.id == client.id);

    lobbyModel.users.splice(index, 1);
    userModel.diceScore = userModel.diceScore + data.diceCount;
    lobbyModel.users.push(userModel);

    this.replaceLobby(lobbyModel.idCode, lobbyModel);
  }

  endGame(data: EndGameDto): void {
    const lobbyModel = this.getLobby(data.lobbyCode);

    lobbyModel.game.winner = data.winner;
    lobbyModel.game.endTime = Date.now();

    this.removeLobby(lobbyModel.idCode);
    this.server.to(lobbyModel.idCode).emit('destroyLobby');
  }

  allLobbies(): LobbyModel[] {
    return Array.from(this.lobbies.values());
  }

  private joinLobbySocketRoom(id: string, client: Socket) {
    client.join(id);
  }

  private checkForUserOccurrencesAndDestroy(client: Socket): void {
    const lobbiesOfUser = this.getLobbiesOfUser(client.id);

    if (lobbiesOfUser.length == 0) {
      return;
    }

    lobbiesOfUser.forEach((value) => {
      if (value.owner.id == client.id) {
        this.removeLobby(value.idCode);

        this.server.to(value.idCode).emit('destroyLobby');
      } else {
        const index = value.users.findIndex((value1) => value1.id == client.id);

        value.users.splice(index, 1);

        this.replaceLobby(value.idCode, value);
      }
    });
  }

  private getLobbiesOfUser(id: string): LobbyModel[] {
    const returnValue = [];

    const lobbyValues = this.lobbies.values();
    const lobbyValuesArray = Array.from(lobbyValues);

    lobbyValuesArray.forEach((value) => {
      if (value.owner.id == id) {
        returnValue.push(value);
        return;
      }

      value.users.forEach((value1) => {
        if (value1.id == id) {
          returnValue.push(value);
        }
      });
    });

    return returnValue;
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
