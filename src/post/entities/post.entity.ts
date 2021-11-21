import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Posts {
  @Prop({ required: true, unique: true })
  id: string;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  image: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  user: User;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop()
  createAt: Date;
  @Prop()
  updateAt: Date;
  @Prop()
  deleteAt: Date;
}

export type PostDocument = Posts & mongoose.Document;
export const PostSchema = SchemaFactory.createForClass(Posts);
