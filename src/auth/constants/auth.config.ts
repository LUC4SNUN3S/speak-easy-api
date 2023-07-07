import { env } from '@src/config/env';

export const authConfig = {
  SECRET: env.JWT_SECRET,
  EXPIRES_IN: env.JWT_EXPIRES_IN,
  STRATEGY_NAME: 'jwt',
};
