import { Module } from '@nestjs/common';
import { UserController } from '@src/users/controllers/users.controller';
import { UserRepository } from '@src/users/repositories/users.repository';
import { CreateUserUseCase } from '@src/users/use-cases/create-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, CreateUserUseCase],
  exports: [UserRepository],
})
export class UsersModule {}
