import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_CLIENT,
  AuthServiceRPC,
  GrpcService,
  HealthCheckResponse,
} from '@housi-nx-microservices/proto-contracts';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dtos/register.dtos';
import { ValidateEmailDto } from './dtos/verify-email.dtos';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  public authService: AuthServiceRPC;

  constructor(
    @Inject(AUTH_PACKAGE_CLIENT) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceRPC>(GrpcService.AUTH);
  }

  healthCheck(): HealthCheckResponse {
    return this.authService.healthCheck({});
  }

  async register(registerPayload: RegisterDto) {
    const response = await lastValueFrom(
      this.authService.register(registerPayload),
    );
    return response;
  }

  async validateEmail(validateEmailPayload: ValidateEmailDto) {
    const response = await lastValueFrom(
      this.authService.validateEmail(validateEmailPayload),
    );
    return response;
  }
}
