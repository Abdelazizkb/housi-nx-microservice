import { Module } from '@nestjs/common';
import { AccountVerificationService } from './account-verification.service';
import { verificationCodeRepository } from './repositories/verification-code.repository';
import { HashingModule } from '../hashing/hashing.module';
import { notificationsRmqClientModule } from '../clients/notifications.rmq-client';

@Module({
  imports: [HashingModule, notificationsRmqClientModule],
  providers: [AccountVerificationService, verificationCodeRepository],
  exports: [AccountVerificationService],
})
export class AccountVerificationModule {}
