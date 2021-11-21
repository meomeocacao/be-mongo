import * as bcrypt from 'bcrypt';

export const HashedPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
