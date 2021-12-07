import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {
  CreateUserDto,
  HashedPassword,
  UpdateUserDto,
  UpperFirstLetter,
  User,
  UserDocument,
} from '@/user';
import { AwsService } from '@/config';
import { SCHEMA_NAME, USER_ERRORS } from '@/core';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SCHEMA_NAME.USER)
    private readonly userModel: Model<UserDocument>,
    private awsService: AwsService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    if (file) {
      // const res = await uploadFileToDriver(file.filename);
      const res = await this.awsService.uploadAWSFile(file);
      console.log(res);
      // createUserDto.profilePicture = res.webContentLink;
      createUserDto.profilePicture = res.Location;
    }
    const userName = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (userName) {
      throw new ConflictException(USER_ERRORS.EXISTING_USER);
    }
    createUserDto.password = await HashedPassword(createUserDto.password);
    createUserDto.firstName = UpperFirstLetter(createUserDto.firstName);
    createUserDto.lastName = UpperFirstLetter(createUserDto.lastName);
    createUserDto.id = uuid();
    console.log(createUserDto);

    const createdUser = new this.userModel({
      ...createUserDto,
      createAt: new Date(),
    });
    console.log(createdUser);

    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new Error(USER_ERRORS.NOT_FOUND);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).lean().exec();
    if (!user) {
      throw new Error(USER_ERRORS.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // const user = await this.findOne(id);
    updateUserDto.firstName = UpperFirstLetter(updateUserDto.firstName);
    updateUserDto.lastName = UpperFirstLetter(updateUserDto.lastName);
    if (updateUserDto.password)
      updateUserDto.password = await HashedPassword(updateUserDto.password);
    await this.userModel
      .findOneAndUpdate(
        { id },
        { ...updateUserDto, updateAt: new Date() },
        { new: true },
      )
      .exec();
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ id }).exec();
  }
}
