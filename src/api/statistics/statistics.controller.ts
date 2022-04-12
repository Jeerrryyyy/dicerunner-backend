import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getDummy(): string {
    return this.statisticsService.getDummy();
  }
}
