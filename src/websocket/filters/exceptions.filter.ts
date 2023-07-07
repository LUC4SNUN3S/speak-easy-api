import { Catch, Logger, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  private showException(exception: any) {
    this.logger.error(exception);
  }

  catch(exception: unknown) {
    if (exception instanceof HttpException) {
      this.showException(exception.getResponse());
    }
  }
}
