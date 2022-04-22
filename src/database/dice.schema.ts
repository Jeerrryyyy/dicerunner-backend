import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiceDocument = Dice & Document;

@Schema()
export class Dice {
  @Prop()
  lobbyCode: string;

  @Prop()
  playerName: string;

  @Prop()
  dateMillis: number;

  @Prop()
  rolledNumber: number;
}

export const DiceSchema = SchemaFactory.createForClass(Dice);
