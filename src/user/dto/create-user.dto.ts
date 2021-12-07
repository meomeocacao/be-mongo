import { USER_ERRORS } from '@/core';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  id?: string;
  @IsNotEmpty({ message: USER_ERRORS.USERNAME_NOT_EMPTY })
  @IsOptional()
  username: string;
  //   @Matches(USER_REGEX.PASSWORD, {
  //     message: USER_ERRORS.INVALID_PASSWORD,
  //   })
  // @IsOptional()
  password: string;
  @IsEmail({}, { message: USER_ERRORS.INVALID_EMAIL })
  @IsOptional()
  email: string;
  @IsNotEmpty({ message: USER_ERRORS.FIRST_NAME_NOT_EMPTY })
  @IsOptional()
  firstName: string;
  @IsNotEmpty({ message: USER_ERRORS.LAST_NAME_NOT_EMPTY })
  @IsOptional()
  lastName: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  birthDate?: Date;
}
