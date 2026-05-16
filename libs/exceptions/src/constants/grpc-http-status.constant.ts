import { HttpStatus } from '@nestjs/common';

export const GRPC_HTTP_STATUS_MAPPINGS = [
  { grpc: 1, http: HttpStatus.GONE },
  { grpc: 2, http: HttpStatus.INTERNAL_SERVER_ERROR },
  { grpc: 3, http: HttpStatus.BAD_REQUEST },
  { grpc: 4, http: HttpStatus.GATEWAY_TIMEOUT },
  { grpc: 5, http: HttpStatus.NOT_FOUND },
  { grpc: 6, http: HttpStatus.CONFLICT },
  { grpc: 7, http: HttpStatus.FORBIDDEN },
  { grpc: 16, http: HttpStatus.UNAUTHORIZED },
] as const;

export const GRPC_STATUS_INTERNAL = 2;

export const GRPC_STATUS_INVALID_ARGUMENT = 3;
