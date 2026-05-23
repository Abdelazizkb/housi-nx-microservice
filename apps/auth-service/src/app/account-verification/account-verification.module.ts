import { Module } from '@nestjs/common';
import { AccountVerificationController } from './account-verification.controller';
import { AccountVerificationService } from './account-verification.service';
import { verificationCodeRepository } from './repositories/verification-code.repository';
import { HashingModule } from '../hashing/hashing.module';
import { notificationsRmqClientModule } from '../clients/notifications.rmq-client';

@Module({
  imports: [HashingModule, notificationsRmqClientModule],
  controllers: [AccountVerificationController],
  providers: [AccountVerificationService, verificationCodeRepository],
  exports: [AccountVerificationService],
})
export class AccountVerificationModule {}
