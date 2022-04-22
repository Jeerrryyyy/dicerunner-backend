import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from '../../database/game.schema';
import { Model } from 'mongoose';
import { GameStatsDto } from './dto/gameStats.dto';
import { Dice, DiceDocument } from '../../database/dice.schema';
import { DiceStatsDto } from './dto/diceStats.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
    @InjectModel(Dice.name)
    private diceModel: Model<DiceDocument>,
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

  async getDices(first: number): Promise<DiceStatsDto[]> {
    const query = this.diceModel.find().sort({ _id: 1 }).skip(first).limit(15);

    return (await query.exec()).map<DiceStatsDto>((value) => {
      return new DiceStatsDto(value.dateMillis, value.lobbyCode, value.playerName, value.rolledNumber);
    });
  }
}
