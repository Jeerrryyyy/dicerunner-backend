import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { GameStatsDto } from './dto/gameStats.dto';
import { DiceStatsDto } from './dto/diceStats.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('games')
  getGames(@Query('first') first): Promise<GameStatsDto[]> {
    if (!first) {
      return this.statisticsService.getGames(0);
    }

    return this.statisticsService.getGames(first);
  }

  @Get('dices')
  getDices(@Query('first') first): Promise<DiceStatsDto[]> {
    if (!first) {
      return this.statisticsService.getDices(0);
    }

    return this.statisticsService.getDices(first);
  }
}
