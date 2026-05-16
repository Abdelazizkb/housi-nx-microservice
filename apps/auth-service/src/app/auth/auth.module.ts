import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authCredentialRepository } from './repositories/auth-credential.repository';
import { HashingProvider } from './hashing.provider';
import { authRoleRepository } from './repositories/auth-role.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    authCredentialRepository,
    authRoleRepository,
    HashingProvider,
  ],
})
export class AuthModule {}
