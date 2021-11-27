import {
  multerConfig,
  multerOptions,
  storage,
} from './../config/multer.config';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongooseClassSerializer.interceptor';
import { User } from './entities/user.entity';
import { uploadFileToDriver } from 'src/config/driver.config';
import { UserProfileTokenInterceptor } from './user-profile.interceptor';
import { Multer } from 'multer';

@Controller('user')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', { storage }),
    ClassSerializerInterceptor,
    UserProfileTokenInterceptor,
  )
  async uploadFile(
    @UploadedFiles() file: Express.Multer.File[],
    // @Body() createUserDto: CreateUserDto,
  ) {
    console.log('any');
    // const res = await uploadFileToDriver(file.filename);
    // if (file) createUserDto.profilePicture = res.webContentLink;
    // return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
