import {
  GrpcService,
  USERS_PACKAGE_CLIENT,
} from '@housi-nx-microservices/proto-contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceRPC } from '@housi-nx-microservices/proto-contracts';

@Injectable()
export class UsersService {
  private usersService: UsersServiceRPC;
  constructor(
    @Inject(USERS_PACKAGE_CLIENT) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceRPC>(
      GrpcService.USERS,
    );
  }

  async healthCheck() {
    return this.usersService.healthCheck({});
  }
}
