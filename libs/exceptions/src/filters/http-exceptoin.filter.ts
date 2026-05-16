import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse();

    response.status(status).json({
      success: false,
      statusCode: status,
      message:
        typeof error === 'string'
          ? error
          : (error as { message: string }).message,
      name: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
