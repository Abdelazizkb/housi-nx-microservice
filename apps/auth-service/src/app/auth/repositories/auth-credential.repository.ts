import { DataSource, Repository } from 'typeorm';
import { AuthCredentialEntity } from '../../database/entities/auth-credential.entity';
import {
  AUTH_CREDENTIAL_REPOSITORY,
  AUTH_DATA_SOURCE,
} from '../../common/constants';

export type AuthCredentialRepository = Repository<AuthCredentialEntity>;

export const authCredentialRepository = {
  provide: AUTH_CREDENTIAL_REPOSITORY,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(AuthCredentialEntity),
  inject: [AUTH_DATA_SOURCE],
};
