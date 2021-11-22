import { Posts } from 'src/post/entities/post.entity';
import {
  Controller,
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/multer.config';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongooseClassSerializer.interceptor';
import { uploadFileToDriver } from 'src/config/driver.config';
import { PaginationParams } from './dto/pagination.dto';

@Controller('post')
@UseInterceptors(MongooseClassSerializerInterceptor(Posts))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    const res = await uploadFileToDriver(file.filename);
    console.log(res);

    if (file) createPostDto.image = res.webContentLink;
    return this.postService.create(createPostDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() pagination: PaginationParams) {
    return this.postService.findAll(pagination.skip, pagination.limit);
  }

  // @Get(':userId')
  // findAllByUserId(@Param('userId') userId: string) {
  //   return this.postService.findAllByUserId(userId);
  // }
  @Get('deleted')
  findAllDeleted() {
    return this.postService.findAllDeleted();
  }

  // @Get(':userId/deleted')
  // findAllDeletedByUserId(@Param('userId') userId: string) {
  //   return this.postService.findAllDeletedByUserId(userId);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Patch(':id')
  softDelete(@Param('id') id: string) {
    return this.postService.softDelete(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
