import { USER_ERRORS, USER_REGEX } from '@/core';
import { IsDate, IsEmail, Matches, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @Matches(USER_REGEX.PASSWORD, { message: USER_ERRORS.INVALID_PASSWORD })
  @IsOptional()
  password?: string;
  @IsEmail({}, { message: USER_ERRORS.INVALID_EMAIL })
  @IsOptional()
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  @IsDate()
  @IsOptional()
  birthDate?: Date;
}
