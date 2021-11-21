import { IsDate, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { USER_ERRORS, USER_REGEX } from 'src/constants/user.constants';

export class CreateUserDto {
  id?: string;
  @IsNotEmpty({ message: USER_ERRORS.USERNAME_NOT_EMPTY })
  username: string;
  //   @Matches(USER_REGEX.PASSWORD, {
  //     message: USER_ERRORS.INVALID_PASSWORD,
  //   })
  password: string;
  @IsEmail({ message: USER_ERRORS.INVALID_EMAIL })
  email: string;
  @IsNotEmpty({ message: USER_ERRORS.FIRST_NAME_NOT_EMPTY })
  firstName: string;
  @IsNotEmpty({ message: USER_ERRORS.LAST_NAME_NOT_EMPTY })
  lastName: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  birthDate?: Date;
}
