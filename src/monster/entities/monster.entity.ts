import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../types/gender';

@Schema()
export class Monster extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    message: 'Gender must be female/male/other',
  })
  gender: Gender;

  @Prop()
  description: string;

  @Prop([String])
  nationalities: string[];

  @Prop({ default: 'No image available'})
  imageUrl: string;

  @Prop({ default: 0 })
  goldBalance: number;

  @Prop({ default: 0.0 })
  speed: number;

  @Prop({ required: true })
  health: number;

  @Prop()
  secretNotes: string;

  @Prop({ required: true })
  monsterPassword: string;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
