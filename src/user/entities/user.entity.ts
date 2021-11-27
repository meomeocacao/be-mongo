import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Posts, PostSchema } from 'src/post/entities/post.entity';

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ unique: true, required: true })
  username: string;
  @Prop()
  @Exclude({ toPlainOnly: true })
  password: string;
  @Prop({ required: false })
  email: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: false })
  lastName: string;
  @Prop()
  profilePicture: string;
  @Prop()
  bio: string;
  @Prop()
  location: string;
  @Prop({ default: new Date() })
  birthDate: Date;
  @Prop()
  createAt: Date;
  @Prop()
  updateAt: Date;
  // @Prop({ type: [PostSchema], ref: 'Post', unique: false })
  // @Type(() => Posts)
  // posts: Posts[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
