import { DataSource } from 'typeorm';
import { USERS_DATA_SOURCE } from '../common/constants';
import { UsersEntity } from './entities/users.entity';

export const databaseProviders = [
  {
    provide: USERS_DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [UsersEntity],
        synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      });

      return dataSource.initialize();
    },
  },
];
