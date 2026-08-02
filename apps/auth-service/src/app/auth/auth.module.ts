import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authCredentialRepository } from './repositories/auth-credential.repository';
import { authRoleRepository } from './repositories/auth-role.repository';
import { usersGrpcClientModule } from '../clients/users.grpc-client';
import { RegisterUseCase } from './usecases/register.usecase';
import { HashingModule } from '../hashing/hashing.module';
import { AccountVerificationModule } from '../account-verification/account-verification.module';
import { VerifyEmailUsecase } from './usecases/verify-email.usecase';

@Module({
  imports: [usersGrpcClientModule, AccountVerificationModule, HashingModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUseCase,
    VerifyEmailUsecase,
    authCredentialRepository,
    authRoleRepository,
  ],
})
export class AuthModule {}
