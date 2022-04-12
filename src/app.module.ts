import { Module } from '@nestjs/common';
import { GameController } from './api/game/game.controller';
import { GameService } from './api/game/game.service';
import { LobbyGateway } from './sockets/lobby.gateway';
import { LobbyCache } from './lobby/lobby.cache';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, LobbyGateway, LobbyCache],
})
export class AppModule {}
