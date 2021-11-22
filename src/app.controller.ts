import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('login')
  async login(@Body() data: { username: string; password: string }) {
    return await this.appService.login(data.username, data.password);
  }
}
