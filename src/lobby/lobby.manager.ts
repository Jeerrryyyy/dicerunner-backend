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
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from '../database/game.schema';
import { Model } from 'mongoose';
import { Dice, DiceDocument } from '../database/dice.schema';

@Injectable()
export class LobbyManager {
  private lobbies: Map<string, LobbyModel> = new Map();
  private logger: Logger = new Logger(LobbyManager.name);

  constructor(
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
    @InjectModel(Dice.name)
    private diceModel: Model<DiceDocument>,
  ) {}

  checkLobby(data: LobbyCodeDto): CheckLobbyDto {
    const lobbyModel = this.getLobby(data.lobbyCode);

    const checkLobbyDto = new CheckLobbyDto(false);

    if (!lobbyModel) return checkLobbyDto;

    checkLobbyDto.exists = true;

    return checkLobbyDto;
  }

  createLobby(data: CreateLobbyDto, client: Socket, server: Server): LobbyModel {
    const generatedId = createRandomId(10);

    this.checkForUserOccurrencesAndDestroy(client, server);

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

  joinLobby(data: JoinLobbyDto, client: Socket, server: Server): LobbyModel {
    const lobbyModel = this.getLobby(data.lobbyCode);

    this.checkForUserOccurrencesAndDestroy(client, server);

    lobbyModel.users.push(new UserModel(client.id, data.username, 0));

    this.replaceLobby(data.lobbyCode, lobbyModel, server);
    this.joinLobbySocketRoom(lobbyModel.idCode, client);

    return lobbyModel;
  }

  clientDisconnect(client: Socket, server: Server): void {
    this.checkForUserOccurrencesAndDestroy(client, server);
  }

  startGame(data: LobbyCodeDto, server: Server): void {
    const lobbyModel = this.getLobby(data.lobbyCode);

    lobbyModel.game.startTime = Date.now();
    lobbyModel.game.started = true;

    this.replaceLobby(lobbyModel.idCode, lobbyModel, server);
  }

  roleDice(data: RoleDiceDto, client: Socket, server: Server): void {
    const lobbyModel = this.getLobby(data.lobbyCode);

    let userModel;
    let index;

    if (client.id == lobbyModel.owner.id) {
      userModel = lobbyModel.owner;
    } else {
      userModel = lobbyModel.users.find((value) => value.id == client.id);
      index = lobbyModel.users.findIndex((value) => value.id == client.id);
      lobbyModel.users.splice(index, 1);
    }

    userModel.diceScore = userModel.diceScore + data.diceCount;

    if (client.id == lobbyModel.owner.id) {
      lobbyModel.owner = userModel;
    } else {
      lobbyModel.users.push(userModel);
    }

    this.replaceLobby(lobbyModel.idCode, lobbyModel, server);
    this.saveDice(lobbyModel.idCode, userModel.name, data.diceCount);
  }

  endGame(data: EndGameDto, server: Server): void {
    const lobbyModel = this.getLobby(data.lobbyCode);

    lobbyModel.game.winner = data.winner;
    lobbyModel.game.endTime = Date.now();

    this.removeLobby(lobbyModel.idCode);
    server.to(lobbyModel.idCode).emit('destroyLobby');

    this.saveGame(lobbyModel);
  }

  allLobbies(): LobbyModel[] {
    return Array.from(this.lobbies.values());
  }

  private joinLobbySocketRoom(id: string, client: Socket) {
    client.join(id);
  }

  private checkForUserOccurrencesAndDestroy(client: Socket, server: Server): void {
    const lobbiesOfUser = this.getLobbiesOfUser(client.id);

    if (lobbiesOfUser.length == 0) {
      return;
    }

    lobbiesOfUser.forEach((value) => {
      if (value.owner.id == client.id) {
        this.removeLobby(value.idCode);

        server.to(value.idCode).emit('destroyLobby');

        this.saveGame(value);
      } else {
        const index = value.users.findIndex((value1) => value1.id == client.id);

        value.users.splice(index, 1);

        this.replaceLobby(value.idCode, value, server);
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

  private replaceLobby(idCode: string, lobbyModel: LobbyModel, server: Server): void {
    this.removeLobby(idCode);
    this.addLobby(lobbyModel);

    server.to(idCode).emit('updateLobby', lobbyModel);
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

  private saveGame(lobbyModel: LobbyModel): void {
    const values = {
      lobbyCode: lobbyModel.idCode,
      ownerName: lobbyModel.owner.name,
      playerNames: lobbyModel.users.map((value) => value.name),
      lobbyCreatedMillis: lobbyModel.creationMillis,
      gameStartMillis: lobbyModel.game.startTime,
      gameEndMillis: lobbyModel.game.endTime,
      gameStarted: lobbyModel.game.started,
      gameWinnerName: lobbyModel.game.winner,
    };

    const createdGameModel = new this.gameModel(values);

    createdGameModel.save().then(
      (value) => {
        this.logger.log("Saved new record of game with id '" + value.lobbyCode + "'");
      },
      (reason) => {
        this.logger.error("Something went wrong while saving '" + lobbyModel.idCode + "'");
        this.logger.error(reason);
      },
    );
  }

  private saveDice(lobbyCode: string, playerName: string, rolledNumber: number): void {
    const values = {
      lobbyCode: lobbyCode,
      playerName: playerName,
      dateMillis: Date.now(),
      rolledNumber: rolledNumber,
    };

    const createdDiceModel = new this.diceModel(values);

    createdDiceModel.save().then(
      (value) => {
        this.logger.log("Saved new record of dice with id '" + value.lobbyCode + "'");
      },
      (reason) => {
        this.logger.error("Something went wrong while saving dice: '" + lobbyCode + "'");
        this.logger.error(reason);
      },
    );
  }
}
