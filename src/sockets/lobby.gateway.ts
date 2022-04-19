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

@WebSocketGateway()
export class LobbyGateway implements OnGatewayInit, OnGatewayDisconnect {
  private lobbyManager: LobbyManager;

  afterInit(server: Server): void {
    this.lobbyManager = new LobbyManager(server);
  }

  handleDisconnect(client: Socket): void {
    console.log({ client });
  }

  @SubscribeMessage('createLobby')
  handleCreateLobby(@MessageBody() data: CreateLobbyDto, @ConnectedSocket() client: Socket): LobbyModel {
    return this.lobbyManager.createLobby(data, client);
  }

  @SubscribeMessage('joinLobby')
  handleJoinLobby(@MessageBody() data: JoinLobbyDto, @ConnectedSocket() client: Socket): LobbyModel {
    return this.lobbyManager.joinLobby(data, client);
  }
}
