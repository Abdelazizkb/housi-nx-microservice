import { HttpStatus } from '@nestjs/common';
import {
  GRPC_HTTP_STATUS_MAPPINGS,
  GRPC_STATUS_INTERNAL,
  GRPC_STATUS_INVALID_ARGUMENT,
} from '../constants/grpc-http-status.constant';

export const grpcToHttp = new Map<number, HttpStatus>(
  GRPC_HTTP_STATUS_MAPPINGS.map(({ grpc, http }) => [grpc, http]),
);

export const httpToGrpc = new Map<number, number>(
  GRPC_HTTP_STATUS_MAPPINGS.map(({ grpc, http }) => [http, grpc]),
);

export function grpcCodeToHttpStatus(code: number): HttpStatus {
  return grpcToHttp.get(code) ?? HttpStatus.INTERNAL_SERVER_ERROR;
}

export function httpStatusToGrpcCode(status: number): number {
  return (
    httpToGrpc.get(status) ??
    (status >= 400 && status < 500
      ? GRPC_STATUS_INVALID_ARGUMENT
      : GRPC_STATUS_INTERNAL)
  );
}
