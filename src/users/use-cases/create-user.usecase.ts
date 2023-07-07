import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiBadRequest } from '@src/core/exceptions/exceptions';
import { CreateUserDto } from '@src/users/dtos/create-user.dto';
import { UserRepository } from '@src/users/repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    firstName,
    lastName,
    password,
  }: CreateUserDto): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);

    if (user) {
      throw new ApiBadRequest('Ops! Email ja cadastrado!');
    }

    return await this.userRepository.createUser({
      email,
      firstName,
      lastName,
      password,
    });
  }
}
