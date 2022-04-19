import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from '../../database/game.schema';
import { Model } from 'mongoose';
import { GameStatsDto } from './dto/gameStats.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
  ) {}

  async getGames(first: number): Promise<GameStatsDto[]> {
    const query = this.gameModel.find().sort({ _id: 1 }).skip(first).limit(15);

    return (await query.exec()).map<GameStatsDto>((value) => {
      return new GameStatsDto(
        value.lobbyCode,
        value.ownerName,
        value.playerNames,
        value.lobbyCreatedMillis,
        value.gameStartMillis,
        value.gameEndMillis,
        value.gameStarted,
        value.gameWinnerName,
      );
    });
  }
}
