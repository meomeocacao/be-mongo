export const USER_ERRORS = {
  EXISTING_USER: 'User already exists',
  NOT_FOUND: 'User not found',
  USERNAME_NOT_EMPTY: 'Username is required',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_TOKEN: 'Invalid token',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_EMAIL: 'Invalid email',
  FIRST_NAME_NOT_EMPTY: 'First name is required',
  LAST_NAME_NOT_EMPTY: 'Last name is required',
};

export const USER_REGEX = {
  PASSWORD: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
};
