import { Injectable } from '@nestjs/common';

@Injectable()
export class LobbyService {
  getDummy(): string {
    return 'Dummy';
  }
}
