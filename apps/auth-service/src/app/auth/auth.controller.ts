import { Controller, ValidationPipe } from '@nestjs/common';
import {
  GRPC_METHODS,
  GrpcPackage,
  GrpcService,
  HealthCheckResponse,
  RegisterResponse,
  ValidateEmailResponse,
} from '@housi-nx-microservices/proto-contracts';
import { RegisterDto } from './dtos/register.dtos';
import { AuthService } from './auth.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ValidateEmailDto } from './dtos/verify-email.dtos';

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

  @GrpcMethod(
    GrpcService.AUTH,
    GRPC_METHODS[GrpcPackage.AUTH][GrpcService.AUTH].REGISTER,
  )
  async register(
    @Payload(new ValidationPipe({ whitelist: true }))
    registerPayload: RegisterDto,
  ): Promise<RegisterResponse> {
    return this.authService.register(registerPayload);
  }

  @GrpcMethod(
    GrpcService.AUTH,
    GRPC_METHODS[GrpcPackage.AUTH][GrpcService.AUTH].VALIDATE_EMAIL,
  )
  async validateEmail(
    @Payload(new ValidationPipe({ whitelist: true }))
    validateEmailPayload: ValidateEmailDto,
  ): Promise<ValidateEmailResponse> {
    return this.authService.validateEmail(validateEmailPayload);
  }
}
