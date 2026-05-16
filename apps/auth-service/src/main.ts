/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcPackage } from '@housi-nx-microservices/proto-contracts';
import { HttpToRpcExceptionFilter } from '@housi-nx-microservices/exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: GrpcPackage.AUTH,
        protoPath: join(
          process.cwd(),
          'libs/proto-contracts/src/proto/auth.proto',
        ),
      },
    },
  );
  app.useGlobalFilters(new HttpToRpcExceptionFilter());
  app.listen();
  console.log('App is running on port 50051');
}

bootstrap();
