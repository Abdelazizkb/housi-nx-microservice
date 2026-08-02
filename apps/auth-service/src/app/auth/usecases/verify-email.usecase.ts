import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountVerificationService } from '../../account-verification/account-verification.service';
import { VerificationTypesEnum } from '../../database/enums/verification-type.enum';
import { ValidateEmailResponse } from '@housi-nx-microservices/proto-contracts';
import { AUTH_DATA_SOURCE } from '../../common/constants';
import { ValidateEmailDto } from '../dtos/verify-email.dtos';
import { httpToGrpc } from '@housi-nx-microservices/exceptions';
import { RpcException } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { VerificationCodeEntity } from '../../database/entities/verification-code.entity';
import { AuthCredentialEntity } from '../../database/entities/auth-credential.entity';

@Injectable()
export class VerifyEmailUsecase {
  constructor(
    private readonly accountVerificationService: AccountVerificationService,
    @Inject(AUTH_DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {}

  async execute(payload: ValidateEmailDto): Promise<ValidateEmailResponse> {
    const success =
      await this.accountVerificationService.confirmVerificationCode(
        payload.verificationId,
        payload.type as VerificationTypesEnum,
        payload.code,
      );

    await this.updateVerifiedCredentials(payload.verificationId);

    return {
      success,
      message: 'Email verified successfully',
    };
  }

  private async updateVerifiedCredentials(
    verificationId: string,
  ): Promise<void> {
    return this.dataSource.transaction(async (manager) => {
      const verificationCodeEntity = await manager.findOne(
        VerificationCodeEntity,
        {
          where: { id: verificationId },
        },
      );

      if (!verificationCodeEntity?.credentialId) {
        throw new RpcException({
          message: 'Failed to verify user email',
          code: httpToGrpc.get(HttpStatus.INTERNAL_SERVER_ERROR),
        });
      }

      await manager.update(
        AuthCredentialEntity,
        verificationCodeEntity.credentialId,
        { isEmailVerified: true },
      );

      await manager.delete(VerificationCodeEntity, { id: verificationId });
    });
  }
}
