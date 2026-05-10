import { DataSource } from 'typeorm';
import { AUTH_DATA_SOURCE } from '../../common/constants';
import { AuthCredentialEntity } from './entities/auth-credential.entity';
import { AuthRoleEntity } from './entities/auth-role.entity';
import { VerificationCodeEntity } from './entities/verification-code.entity';

export const databaseProviders = [
  {
    provide: AUTH_DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          AuthCredentialEntity,
          AuthRoleEntity,
          VerificationCodeEntity,
        ],
        synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      });

      return dataSource.initialize();
    },
  },
];
