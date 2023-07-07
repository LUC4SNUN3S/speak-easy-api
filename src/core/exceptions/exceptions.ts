import { HttpException, HttpStatus } from '@nestjs/common';
import { MessagesValidations } from '@src/core/constants/messages-validations';

export interface ApiExceptionParams {
  message: string;
  status: HttpStatus;
}

export class ApiException extends HttpException {
  constructor(params: ApiExceptionParams) {
    super(
      {
        message: params.message,
        status: params.status,
      },
      params.status,
    );
  }
}

export class ApiUnauthorized extends ApiException {
  constructor(message = MessagesValidations.UNAUTHORIZED) {
    super({
      message,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class ApiForbidden extends ApiException {
  constructor(message = MessagesValidations.FORBIDDEN) {
    super({
      message,
      status: HttpStatus.FORBIDDEN,
    });
  }
}

export class ApiNotfound extends ApiException {
  constructor(message = MessagesValidations.NOT_FOUND) {
    super({
      message,
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class ApiBadRequest extends ApiException {
  constructor(message = MessagesValidations.BAD_REQUEST) {
    super({
      message,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class ApiConflict extends ApiException {
  constructor(message = MessagesValidations.CONFLICT) {
    super({
      message,
      status: HttpStatus.CONFLICT,
    });
  }
}
