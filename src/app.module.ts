import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from '@/post';
import { CoreModule } from '@/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forRoot(
      'mongodb+srv://mymongodb:Gunny2.0@cluster0.h2rrt.mongodb.net/blog_db?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
