import { Controller, ValidationPipe } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import {
  HealthCheckResponse,
  RegisterResponse,
} from '@housi-nx-microservices/proto-contracts';
import { RegisterDto } from './dtos/register.dtos';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'HealthCheck')
  healthCheck(): HealthCheckResponse {
    return {
      success: true,
      message: 'Auth service is running',
    };
  }

  @GrpcMethod('AuthService', 'Register')
  async register(
    @Payload(new ValidationPipe({ whitelist: true }))
    registerPayload: RegisterDto,
  ): Promise<RegisterResponse> {
    return this.authService.register(registerPayload);
  }
}
