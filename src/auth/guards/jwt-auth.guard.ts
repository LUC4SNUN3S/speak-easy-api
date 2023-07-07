import { AuthGuard } from '@nestjs/passport';
import { authConfig } from '@src/auth/constants/auth.config';

export class JwtAuthGuard extends AuthGuard(authConfig.STRATEGY_NAME) {}
