import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HealthCheckResponse } from '@housi-nx-microservices/proto-contracts';

@Controller()
export class AuthController {
  @GrpcMethod('AuthService', 'HealthCheck')
  healthCheck(): HealthCheckResponse {
    return {
      success: true,
      message: 'Auth service is running',
    };
  }
}
