import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  APP_PORT: z.string().default('3000'),
  DATABASE_URL: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
  JWT_EXPIRES_IN: z.string().nonempty(),
  GLOBAL_PREFIX_API: z.string().default('speak-easy-api/v1'),
});

const validateEnvironmentVariables = () => {
  return envSchema.parse(process.env);
};

export const env = validateEnvironmentVariables();
