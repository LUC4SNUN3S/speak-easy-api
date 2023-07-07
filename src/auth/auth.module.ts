import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '@src/auth/constants/auth.config';
import { AuthController } from '@src/auth/controllers/auth.controller';
import { jwtStrategy } from '@src/auth/strategies/jwt.strategy';
import { LoginUseCase } from '@src/auth/use-cases/login.usecase';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConfig.SECRET,
      signOptions: { expiresIn: authConfig.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, jwtStrategy],
  exports: [],
})
export class AuthModule {}
