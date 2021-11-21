import { USER_ERRORS } from 'src/constants/user.constants';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashedPassword } from './config/hash-password.config';
import { UpperFirstLetter } from './config/upper-first-lettle.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { SCHEMA_NAME } from 'src/constants/schema.name';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SCHEMA_NAME.USER) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });

    const userName = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (userEmail || userName) {
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
    return this.userModel.find().populate('posts');
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    updateUserDto.firstName = updateUserDto.firstName
      ? UpperFirstLetter(updateUserDto.firstName)
      : null;
    updateUserDto.lastName = updateUserDto.lastName
      ? UpperFirstLetter(updateUserDto.lastName)
      : null;
    updateUserDto.password = updateUserDto.password
      ? await HashedPassword(updateUserDto.password)
      : null;

    return await this.userModel
      .findOneAndUpdate(
        { id },
        { ...updateUserDto, updateAt: new Date() },
        { new: true },
      )
      .exec();
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ id }).exec();
  }
}
