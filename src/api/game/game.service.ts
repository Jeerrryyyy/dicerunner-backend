import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  getDummy(): string {
    return 'Dummy';
  }
}
