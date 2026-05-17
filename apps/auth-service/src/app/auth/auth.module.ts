import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authCredentialRepository } from './repositories/auth-credential.repository';
import { HashingProvider } from './hashing.provider';
import { authRoleRepository } from './repositories/auth-role.repository';
import { usersGrpcClientModule } from '../clients/users.grpc-client';
import { RegisterUseCase } from './usecases/register.usecase';

@Module({
  imports: [usersGrpcClientModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUseCase,
    authCredentialRepository,
    authRoleRepository,
    HashingProvider,
  ],
})
export class AuthModule {}
