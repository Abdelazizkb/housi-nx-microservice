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
    return throwError(() => ({
      success: false,
      code: httpStatusToGrpcCode(exception.getStatus()),
      message: exception.message,
      name: exception.name,
      timestamp: new Date().toISOString(),
    }));
  }
}
