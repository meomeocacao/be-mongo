import { USER_ERRORS } from 'src/constants/user.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashedPassword } from './user/config/hash-password.config';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AppService {
  constructor(private userService: UserService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user);

      return user;
    }
    throw new NotFoundException(USER_ERRORS.NOT_FOUND);
  }
}
