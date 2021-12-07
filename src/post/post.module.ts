import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostController, PostSchema } from '@/post';
import { SCHEMA_NAME } from '@/core';
import { UserSchema } from '@/user';
import { CoreModule } from '@/config';
import { PostService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMA_NAME.POST, schema: PostSchema },
      { name: SCHEMA_NAME.USER, schema: UserSchema },
    ]),
    CoreModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
