/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { queues } from '@housi-nx-microservices/event-schemas';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: queues.NOTIFICATIONS,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  Logger.log(`🚀 Application is running on: ${process.env.RABBITMQ_URL}`);
}

bootstrap();
