import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}
  async validateUser(loginAuthDto: LoginAuthDto): Promise<User> {
    const user = await this.usersService.findByUsername(loginAuthDto.username);
    if (user && (await bcrypt.compare(loginAuthDto.password, user.password))) {
      return user;
    }
    return null;
  }
}
