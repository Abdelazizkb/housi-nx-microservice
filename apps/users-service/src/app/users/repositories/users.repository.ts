import { DataSource, Repository } from 'typeorm';
import { USERS_DATA_SOURCE, USERS_REPOSITORY } from '../../common/constants';
import { UsersEntity } from '../../database/entities/users.entity';

export type UsersRepository = Repository<UsersEntity>;

export const usersRepository = {
  provide: USERS_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UsersEntity),
  inject: [USERS_DATA_SOURCE],
};
