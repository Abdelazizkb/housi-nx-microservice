import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { GrpcPackage } from '@housi-nx-microservices/proto-contracts';
import { join } from 'path';
import { HttpToRpcExceptionFilter } from '@housi-nx-microservices/exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.USERS_SERVICE_URL,
        package: GrpcPackage.USERS,
        protoPath: join(
          process.cwd(),
          'libs/proto-contracts/src/proto/users.proto',
        ),
      },
    },
  );
  app.useGlobalFilters(new HttpToRpcExceptionFilter());
  await app.listen();
  Logger.log(`🚀 Application is running on: ${process.env.USERS_SERVICE_URL}`);
}

bootstrap();
