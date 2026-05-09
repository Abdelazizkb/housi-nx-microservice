import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  AUTH_PACKAGE_CLIENT,
  GrpcPackage,
} from '@housi-nx-microservices/proto-contracts';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: GrpcPackage.AUTH,
          protoPath: join(
            process.cwd(),
            'libs/proto-contracts/src/proto/auth.proto',
          ),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
