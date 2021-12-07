import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from './entities/user.entity';
import { SCHEMA_NAME } from '@/core';
import { CoreModule } from '@/config';
import { UserService } from './services';
import { UserController } from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SCHEMA_NAME.USER, schema: UserSchema }]),
    CoreModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
