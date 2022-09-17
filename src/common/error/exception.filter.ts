import {
  ArgumentsHost, BadGatewayException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DatabaseError } from './database.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: ValidationError[] | HttpException | DatabaseError | Error, host: ArgumentsHost) {
    Logger.debug(`AllExceptionsFilter call`);
    if (!Array.isArray(exception)){
      Logger.debug(`exception.constructor: `, JSON.stringify(exception.constructor.name));
      Logger.debug(`exception.message: `, JSON.stringify(exception.message));
      Logger.debug(`exception?.stack: `, JSON.stringify(exception?.stack));
    } else if (Array.isArray(exception) && exception.every(e => e instanceof ValidationError)) {
      exception.forEach(e => {
        Logger.debug(`exception.constructor: `, JSON.stringify(e.constructor.name));
        Logger.debug(`exception: `, JSON.stringify(exception));
      });
    }
    
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let status: number;
    let message: string;
    if (Array.isArray(exception) && exception.every(e => e instanceof ValidationError)) {
      status = 404;
      message = 'Bad Request Exception';
      BadGatewayException
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof DatabaseError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception?.describe ? exception.describe : '';
    } else { // exception instanceof Error
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '오류가 발생했습니다. 다시 한번 시도해보시고 동일한 문제가 반복된다면 문의 부탁드립니다.';
    }

    response.status(status).json({ message })
  }
}
