import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { LobbyManager } from '../lobby/lobby.manager';
import { Server, Socket } from 'socket.io';
import { LobbyModel } from '../lobby/models/lobby.model';
import { CreateLobbyDto } from './dto/createLobby.dto';
import { JoinLobbyDto } from './dto/joinLobby.dto';
import { LobbyCodeDto } from './dto/lobbyCode.dto';
import { CheckLobbyDto } from './dto/checkLobby.dto';

@WebSocketGateway()
export class LobbyGateway implements OnGatewayInit, OnGatewayDisconnect {
  private lobbyManager: LobbyManager;

  afterInit(server: Server): void {
    this.lobbyManager = new LobbyManager(server);
  }

  handleDisconnect(client: Socket): void {
    this.lobbyManager.clientDisconnect(client);
  }

  @SubscribeMessage('checkLobby')
  handleCheckLobby(@MessageBody() data: LobbyCodeDto): CheckLobbyDto {
    return this.lobbyManager.checkLobby(data);
  }

  @SubscribeMessage('createLobby')
  handleCreateLobby(@MessageBody() data: CreateLobbyDto, @ConnectedSocket() client: Socket): LobbyModel {
    return this.lobbyManager.createLobby(data, client);
  }

  @SubscribeMessage('joinLobby')
  handleJoinLobby(@MessageBody() data: JoinLobbyDto, @ConnectedSocket() client: Socket): LobbyModel {
    return this.lobbyManager.joinLobby(data, client);
  }

  @SubscribeMessage('startGame')
  handleStartGame(@MessageBody() data: LobbyCodeDto): LobbyModel {
    return this.lobbyManager.startGame(data);
  }
}
