import { Controller, Get } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller()
export class LobbyController {
  constructor(private readonly roomService: LobbyService) {}

  @Get()
  getDummy(): string {
    return this.roomService.getDummy();
  }
}
