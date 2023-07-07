import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginOutputDto } from '@src/auth/dtos/login-output.dto';
import { LoginDto } from '@src/auth/dtos/login.dto';
import { LoginUseCase } from '@src/auth/use-cases/login.usecase';
import { ApiExceptionDto } from '@src/core/dtos/api-responses.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @ApiResponse({
    status: 409,
    type: ApiExceptionDto,
  })
  @ApiResponse({
    status: 200,
    type: LoginOutputDto,
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}
