import { HealthCheckResponse } from '@housi-nx-microservices/proto-contracts';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'HealthCheck')
  healthCheck(): HealthCheckResponse {
    return {
      success: true,
      message: 'Users service is running',
    };
  }

  @GrpcMethod('UsersService', 'CreateUser')
  createUser(createUserPayload: CreateUserDto) {
    return this.usersService.createUser(createUserPayload);
  }
}
