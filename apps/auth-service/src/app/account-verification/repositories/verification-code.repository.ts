import { DataSource, Repository } from 'typeorm';
import { VerificationCodeEntity } from '../../database/entities/verification-code.entity';
import {
  AUTH_DATA_SOURCE,
  VERIFICATION_CODE_REPOSITORY,
} from '../../common/constants';

export type VerificationCodeRepository = Repository<VerificationCodeEntity>;

export const verificationCodeRepository = {
  provide: VERIFICATION_CODE_REPOSITORY,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(VerificationCodeEntity),
  inject: [AUTH_DATA_SOURCE],
};
