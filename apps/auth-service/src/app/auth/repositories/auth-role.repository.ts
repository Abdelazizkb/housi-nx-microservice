import { DataSource } from 'typeorm';
import {
  AUTH_DATA_SOURCE,
  AUTH_ROLE_REPOSITORY,
} from '../../../common/constants';
import { AuthRoleEntity } from '../../database/entities/auth-role.entity';

export const authRoleRepository = {
  provide: AUTH_ROLE_REPOSITORY,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(AuthRoleEntity),
  inject: [AUTH_DATA_SOURCE],
};
