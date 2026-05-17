import {
  GrpcPackage,
  USERS_PACKAGE_CLIENT,
} from '@housi-nx-microservices/proto-contracts';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const usersGrpcClientModule = ClientsModule.register([
  {
    name: USERS_PACKAGE_CLIENT,
    transport: Transport.GRPC,
    options: {
      url: process.env.USERS_PACKAGE_CLIENT ?? '0.0.0.0:50052',
      package: GrpcPackage.USERS,
      protoPath: join(
        process.cwd(),
        'libs/proto-contracts/src/proto/users.proto',
      ),
    },
  },
]);
