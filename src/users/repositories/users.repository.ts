import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { bcryptUtils } from '@src/core/utils/bcrypt.util';
import { DatabaseService } from '@src/database/database.service';
import { CreateUserDto } from '@src/users/dtos/create-user.dto';
import { generateUserKey } from '@src/users/utils/generate-key.util';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser({
    email,
    firstName,
    lastName,
    password,
  }: CreateUserDto): Promise<User> {
    return this.databaseService.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: await bcryptUtils.hashPassword(password),
        userKey: generateUserKey(),
      },
    });
  }
}
