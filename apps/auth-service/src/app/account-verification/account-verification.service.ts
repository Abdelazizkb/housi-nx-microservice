import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { VerificationCodeRepository } from './repositories/verification-code.repository';
import { MoreThan } from 'typeorm';
import { httpToGrpc } from '@housi-nx-microservices/exceptions';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { HashingProvider } from '../hashing/hashing.provider';
import { VerificationTypesEnum } from '../database/enums/verification-type.enum';
import { VERIFICATION_CODE_REPOSITORY } from '../common/constants';
import {
  notificationMessages,
  NOTIFICATIONS_PACKAGE_CLIENT,
} from '@housi-nx-microservices/event-schemas';

@Injectable()
export class AccountVerificationService {
  private Logger = new Logger(AccountVerificationService.name);
  constructor(
    @Inject(VERIFICATION_CODE_REPOSITORY)
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly hashingProvider: HashingProvider,
    @Inject(NOTIFICATIONS_PACKAGE_CLIENT)
    private readonly notificationsClient: ClientRMQ,
  ) {}

  async issueVerificationCode(
    credentialId: string,
    type: VerificationTypesEnum,
  ): Promise<number> {
    const verificationCode = this.generateVerificationCode();

    await this.verificationCodeRepository.upsert(
      {
        credentialId,
        type,
        code: await this.hashingProvider.hash(verificationCode.toString()),
        expiresAt: this.generateVerificationCodeExpirationDate(),
      },
      {
        conflictPaths: ['credentialId', 'type'],
      },
    );

    console.log('SEND_EMAIL_VERIFICATION', {
      credentialId,
      code: verificationCode,
      type,
    });
    this.Logger.log('Emitting SEND_EMAIL_VERIFICATION event', {
      verificationCode,
    });

    this.notificationsClient
      .emit(notificationMessages.SEND_EMAIL_VERIFICATION, {
        credentialId,
        code: verificationCode,
        type,
      })
      .subscribe();

    return verificationCode;
  }

  async confirmVerificationCode(
    credentialId: string,
    type: VerificationTypesEnum,
    code: number,
  ): Promise<boolean> {
    const verificationCode = await this.verificationCodeRepository.findOne({
      where: {
        credentialId,
        type,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (!verificationCode) {
      throw new RpcException({
        message: 'Invalid or expired verification code',
        code: httpToGrpc.get(HttpStatus.NOT_FOUND),
      });
    }

    const isValid = await this.hashingProvider.compare(
      code.toString(),
      verificationCode.code,
    );

    if (!isValid) {
      throw new RpcException({
        message: 'Invalid verification code',
        code: httpToGrpc.get(HttpStatus.NOT_FOUND),
      });
    }

    return true;
  }

  private generateVerificationCode(): number {
    const length =
      parseInt(process.env.VERIFICATION_CODE_LENGTH ?? '6', 10) || 6;
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  private generateVerificationCodeExpirationDate(): Date {
    const expirationMinutes =
      parseInt(
        process.env.VERIFICATION_CODE_EXPIRATION_MINUTES ?? '1440',
        10,
      ) || 1440;
    return new Date(Date.now() + expirationMinutes * 60 * 1000);
  }
}
