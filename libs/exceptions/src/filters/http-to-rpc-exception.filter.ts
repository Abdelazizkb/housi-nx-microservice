import {
  ArgumentsHost,
  Catch,
  HttpException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { httpStatusToGrpcCode } from '../helpers/grpc-http-status.helper';

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: HttpException, _host: ArgumentsHost): Observable<any> {
    console.log('HttpToRpcExceptionFilter', exception);
    return throwError(() => ({
      code: httpStatusToGrpcCode(exception.getStatus()),
      message: exception.message,
      details: this.getDetails(exception),
    }));
  }

  private getDetails(exception: HttpException): string | string[] {
    const response = exception.getResponse();
    if (typeof response === 'string') {
      return response;
    }
    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const msg = (response as { message: string | string[] }).message;
      if (msg !== undefined) {
        return msg;
      }
    }
    return exception.message;
  }
}
