import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { authConfig } from '@src/auth/constants/auth.config';
import { ApiUnauthorized } from '@src/core/exceptions/exceptions';
import { UserRepository } from '@src/users/repositories/users.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface IValidateParams {
  id: string;
  email: string;
}

interface IValidateResponse {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.SECRET,
    });
  }

  async validate({ id }: IValidateParams): Promise<IValidateResponse> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new ApiUnauthorized('Ops! Você não está autenticado');
    }

    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };
  }
}
