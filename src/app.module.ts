import { Module } from '@nestjs/common';
import { GameController } from './api/game/game.controller';
import { GameService } from './api/game/game.service';
import { LobbyGateway } from './sockets/lobby.gateway';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, LobbyGateway],
})
export class AppModule {}
