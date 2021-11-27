import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DriverBlobService } from './config/services/driver-blob.service';
import { CoreModule } from './config/core.module';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forRoot(
      'mongodb+srv://mymongodb:Gunny2.0@cluster0.h2rrt.mongodb.net/blog_db?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PostModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, DriverBlobService],
})
export class AppModule {}
