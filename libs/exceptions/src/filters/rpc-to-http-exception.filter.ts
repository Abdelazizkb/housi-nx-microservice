import { ArgumentsHost, Catch } from '@nestjs/common';
import { grpcCodeToHttpStatus } from '../helpers/grpc-http-status.helper';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GrpcToHttpExceptionFilter extends BaseExceptionFilter {
  override catch(exception: any, host: ArgumentsHost) {
    const grpcError = exception?.error ?? exception;
    const isGrpcError = grpcError?.code !== undefined;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const status = isGrpcError
      ? grpcCodeToHttpStatus(grpcError.code)
      : response.statusCode;

    response.status(status).json({
      success: false,
      statusCode: status,
      message: grpcError?.details || 'Internal server error',
      name: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
