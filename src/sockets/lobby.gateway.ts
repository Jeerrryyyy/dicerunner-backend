import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LobbyCache } from '../lobby/lobby.cache';
import { Server, Socket } from 'socket.io';
import { LobbyModel } from '../lobby/models/lobby.model';
import { createRandomId } from '../utils/utils';
import { CreateLobbyDto } from './dto/createLobby.dto';
import { UserModel } from './models/user.model';

@WebSocketGateway()
export class LobbyGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly lobbyCache: LobbyCache) {}

  @SubscribeMessage('createLobby')
  handleCreateLobby(
    @MessageBody() data: CreateLobbyDto,
    @ConnectedSocket() client: Socket,
  ): LobbyModel {
    const generatedId = createRandomId(10);

    const lobbyModel: LobbyModel = new LobbyModel(
      generatedId,
      new UserModel(client.id, data.username),
      [],
      Date.now(),
      false,
    );

    this.lobbyCache.addLobby(lobbyModel);

    return this.lobbyCache.getLobby(generatedId);
  }
}
