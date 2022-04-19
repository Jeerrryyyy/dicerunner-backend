import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LobbyManager } from '../lobby/lobby.manager';
import { Server, Socket } from 'socket.io';
import { LobbyModel } from '../lobby/models/lobby.model';
import { CreateLobbyDto } from './dto/createLobby.dto';
import { JoinLobbyDto } from './dto/joinLobby.dto';
import { LobbyCodeDto } from './dto/lobbyCode.dto';
import { CheckLobbyDto } from './dto/checkLobby.dto';
import { RoleDiceDto } from './dto/roleDice.dto';
import { EndGameDto } from './dto/endGame.dto';

@WebSocketGateway()
export class LobbyGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(private lobbyManager: LobbyManager) {}

  handleDisconnect(client: Socket): void {
    this.lobbyManager.clientDisconnect(client, this.server);
  }

  @SubscribeMessage('checkLobby')
  handleCheckLobby(@MessageBody() data: LobbyCodeDto): CheckLobbyDto {
    return this.lobbyManager.checkLobby(data);
  }

  @SubscribeMessage('createLobby')
  handleCreateLobby(@MessageBody() data: CreateLobbyDto, @ConnectedSocket() client: Socket): LobbyModel {
    return this.lobbyManager.createLobby(data, client, this.server);
  }

  @SubscribeMessage('joinLobby')
  handleJoinLobby(@MessageBody() data: JoinLobbyDto, @ConnectedSocket() client: Socket): LobbyModel {
    return this.lobbyManager.joinLobby(data, client, this.server);
  }

  @SubscribeMessage('startGame')
  handleStartGame(@MessageBody() data: LobbyCodeDto): void {
    this.lobbyManager.startGame(data, this.server);
  }

  @SubscribeMessage('roleDice')
  handleRoleDice(@MessageBody() data: RoleDiceDto, @ConnectedSocket() client: Socket): void {
    this.lobbyManager.roleDice(data, client, this.server);
  }

  @SubscribeMessage('endGame')
  handleEndGame(@MessageBody() data: EndGameDto): void {
    this.lobbyManager.endGame(data, this.server);
  }

  @SubscribeMessage('allLobbies')
  handleAllLobbies(): LobbyModel[] {
    return this.lobbyManager.allLobbies();
  }
}
