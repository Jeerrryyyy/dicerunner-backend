import { Module } from '@nestjs/common';
import { LobbyGateway } from './sockets/lobby.gateway';
import { HealthController } from './api/health/health.controller';
import { StatisticsService } from './api/statistics/statistics.service';
import { StatisticsController } from './api/statistics/statistics.controller';

@Module({
  imports: [],
  controllers: [HealthController, StatisticsController],
  providers: [StatisticsService, LobbyGateway],
})
export class AppModule {}
