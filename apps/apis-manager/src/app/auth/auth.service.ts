import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_CLIENT,
  AuthServiceRPC,
  GrpcService,
  HealthCheckResponse,
} from '@housi-nx-microservices/proto-contracts';

@Injectable()
export class AuthService {
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
}
