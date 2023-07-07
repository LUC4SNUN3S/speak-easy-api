import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

export const bcryptUtils = {
  matchPasswords: (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword);
  },

  hashPassword: (password: string) => {
    return bcrypt.hash(password, SALT_OR_ROUNDS);
  },
};
