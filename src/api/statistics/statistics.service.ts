import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  getDummy(): string {
    return 'Dummy';
  }
}
