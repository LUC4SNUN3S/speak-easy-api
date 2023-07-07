import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@src/auth/dtos/login.dto';
import { ApiConflict } from '@src/core/exceptions/exceptions';
import { bcryptUtils } from '@src/core/utils/bcrypt.util';
import { UserRepository } from '@src/users/repositories/users.repository';

interface IPayload {
  email: string;
  id: string;
}

export interface IExecuteResponse {
  user: IPayload;
  accessToken: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async generateJwt(payload: IPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async execute(loginDto: LoginDto): Promise<IExecuteResponse> {
    const user = await this.usersRepository.getUserByEmail(loginDto.email);

    if (!user) {
      throw new ApiConflict('Ops! Email ou senha incorretos.');
    }

    const isMatchPasswords = await bcryptUtils.matchPasswords(
      loginDto.password,
      user.password,
    );

    if (!isMatchPasswords) {
      throw new ApiConflict('Ops! Email ou senha incorretos.');
    }

    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      user: payload,
      accessToken: await this.generateJwt(payload),
    };
  }
}
