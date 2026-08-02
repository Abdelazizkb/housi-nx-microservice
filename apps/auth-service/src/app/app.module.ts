import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AccountVerificationModule } from './account-verification/account-verification.module';

@Module({
  imports: [AuthModule, DatabaseModule, AccountVerificationModule],
})
export class AppModule {}
