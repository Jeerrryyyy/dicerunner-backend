import { Module } from '@nestjs/common';
import { LobbyGateway } from './sockets/lobby.gateway';
import { HealthController } from './api/health/health.controller';
import { StatisticsService } from './api/statistics/statistics.service';
import { StatisticsController } from './api/statistics/statistics.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './database/game.schema';
import { LobbyManager } from './lobby/lobby.manager';
import { Dice, DiceSchema } from './database/dice.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_STRING),
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
      {
        name: Dice.name,
        schema: DiceSchema,
      },
    ]),
  ],
  controllers: [HealthController, StatisticsController],
  providers: [StatisticsService, LobbyGateway, LobbyManager],
})
export class AppModule {}
