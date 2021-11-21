import { IsDate, IsEmail, Matches } from 'class-validator';
import { USER_REGEX, USER_ERRORS } from 'src/constants/user.constants';
export class UpdateUserDto {
  @Matches(USER_REGEX.PASSWORD, { message: USER_ERRORS.INVALID_PASSWORD })
  password?: string;
  @IsEmail({ message: USER_ERRORS.INVALID_EMAIL })
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  @IsDate()
  birthDate?: Date;
}
