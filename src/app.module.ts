import { Module } from '@nestjs/common';
import { LobbyGateway } from './sockets/lobby.gateway';
import { HealthController } from './api/health/health.controller';
import { StatisticsService } from './api/statistics/statistics.service';
import { StatisticsController } from './api/statistics/statistics.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './database/game.schema';
import { LobbyManager } from './lobby/lobby.manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [HealthController, StatisticsController],
  providers: [StatisticsService, LobbyGateway, LobbyManager],
})
export class AppModule {}
