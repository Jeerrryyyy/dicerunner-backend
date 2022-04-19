import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  lobbyCode: string;

  @Prop()
  ownerName: string;

  @Prop()
  playerNames: string[];

  @Prop()
  lobbyCreatedMillis: number;

  @Prop()
  gameStartMillis: number;

  @Prop()
  gameEndMillis: number;

  @Prop()
  gameStarted: boolean;

  @Prop()
  gameWinnerName: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
