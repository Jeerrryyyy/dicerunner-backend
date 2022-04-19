import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { GameStatsDto } from './dto/gameStats.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('games')
  getGames(@Query('first') first): Promise<GameStatsDto[]> {
    if (first) {
      return this.statisticsService.getGames(0);
    }

    return this.statisticsService.getGames(first);
  }
}
