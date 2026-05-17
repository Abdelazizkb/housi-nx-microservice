// auth.grpc-client.ts (or auth-client.module.ts)
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  AUTH_PACKAGE_CLIENT,
  GrpcPackage,
} from '@housi-nx-microservices/proto-contracts';

export const AuthGrpcClientModule = ClientsModule.register([
  {
    name: AUTH_PACKAGE_CLIENT,
    transport: Transport.GRPC,
    options: {
      url: process.env.AUTH_GRPC_URL ?? 'localhost:50051',
      package: GrpcPackage.AUTH,
      protoPath: join(
        process.cwd(),
        'libs/proto-contracts/src/proto/auth.proto',
      ),
    },
  },
]);
