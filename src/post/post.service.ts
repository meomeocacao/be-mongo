import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts, PostDocument } from './entities/post.entity';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { SCHEMA_NAME } from 'src/constants/schema.name';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<PostDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Posts> {
    const user = await this.userModel.findOne({ id: createPostDto.user });
    const createdPost = new this.postModel({
      ...createPostDto,
      id: uuid(),
      user: user,
      createAt: new Date(),
    });
    return await createdPost.save();
  }

  async findAll(skip = 0, limit = 5): Promise<Posts[]> {
    const query = this.postModel
      .find({ isDeleted: false })
      .populate('user')
      .skip(skip)
      .sort({ createAt: -1 });
    // .exec();
    if (limit) query.limit(limit);
    return await query;
  }

  async findAllByUserId(userId: string): Promise<Posts[]> {
    const user = await this.userModel.findOne({ id: userId });
    // const user = await this.userModel.findById(userId);
    return await this.postModel.find({ user: user, isDeleted: false }).exec();
  }

  async findAllDeleted(): Promise<Posts[]> {
    return await this.postModel.find({ isDeleted: true }).exec();
  }
  async findAllDeletedByUserId(userId: string): Promise<Posts[]> {
    const user = await this.userModel.findOne({ id: userId });
    // const user = await this.userModel.findById(userId);
    return await this.postModel.find({ user: user, isDeleted: true }).exec();
  }
  async findOne(id: string): Promise<any> {
    return await this.postModel
      .findOne({ id, isDeleted: false })
      .populate('user');

    // .populated('user')
    // .exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Posts> {
    return await this.postModel.findOneAndUpdate(
      { id, isDeleted: false },
      { ...updatePostDto, updateAt: new Date() },
      {
        new: true,
      },
    );
  }

  async softDelete(id: string): Promise<Posts> {
    return await this.postModel
      .findOneAndUpdate({ id, isDeleted: false }, { isDeleted: true })
      .exec();
  }

  async remove(id: string): Promise<Posts> {
    return await this.postModel
      .findOneAndRemove({ id, isDeleted: true })
      .exec();
  }
}
