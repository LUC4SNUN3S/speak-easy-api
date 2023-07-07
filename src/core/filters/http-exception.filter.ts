import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MessagesValidations } from '@src/core/constants/messages-validations';

import { ApiExceptionParams } from '../exceptions/exceptions';

interface IResponseApiError {
  messages: any[];
  status: number;
}

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MyExceptionFilter.name);

  private printError(message: any, status: number) {
    this.logger.error({
      status,
      message,
    });
  }

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const customResponse: IResponseApiError = {
      messages: [MessagesValidations.INTERNAL_ERROR, { error: error.message }],
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!(error instanceof HttpException)) {
      this.printError(customResponse?.messages, customResponse?.status);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(customResponse, error);
    }

    this.printError(error.message, status);

    return response.status(status).send({ message: error.message, status });
  }
}
