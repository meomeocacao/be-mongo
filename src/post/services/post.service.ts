import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { CreatePostDto, PostDocument, Posts, UpdatePostDto } from '@/post';
import { UserDocument } from '@/user';
import { POST_ERROR, SCHEMA_NAME } from '@/core';
import { MESSAGE_RETURN } from '@/core/constants/constants';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(SCHEMA_NAME.POST)
    private readonly postModel: Model<PostDocument>,
    @InjectModel(SCHEMA_NAME.USER)
    private readonly userModel: Model<UserDocument>,
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
    if (limit) query.limit(limit);
    return await query;
  }

  async findAllByUserId(userId: string): Promise<Posts[]> {
    const user = await this.userModel.findById(userId);
    return await this.postModel
      .find({}, { user: user, isDeleted: false })
      .exec();
  }

  async findAllDeleted(): Promise<Posts[]> {
    return await this.postModel.find({ isDeleted: true }).exec();
  }
  async findAllDeletedByUserId(userId: string): Promise<Posts[]> {
    const user = await this.userModel.findOne({ id: userId });
    return await this.postModel
      .find({}, { user: user, isDeleted: true })
      .exec();
  }
  async findOne(id: string): Promise<any> {
    return await this.postModel
      .findOne({ id, isDeleted: false })
      .populate('user');
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Posts> {
    const post = await this.findOne(id);
    if (!post) {
      throw new Error(POST_ERROR.NOT_FOUND);
    }
    await this.postModel.findOneAndUpdate(
      { id, isDeleted: false },
      { ...updatePostDto, updateAt: new Date() },
      {
        new: true,
      },
    );
    return await this.findOne(id);
  }

  async softDelete(id: string): Promise<Posts> {
    await this.postModel
      .findOneAndUpdate({ id, isDeleted: false }, { isDeleted: true })
      .exec();
    return await this.findOne(id);
  }

  async remove(id: string): Promise<string> {
    await this.postModel.findOneAndRemove({ id, isDeleted: true }).exec();
    return MESSAGE_RETURN.REMOVE;
  }
}
