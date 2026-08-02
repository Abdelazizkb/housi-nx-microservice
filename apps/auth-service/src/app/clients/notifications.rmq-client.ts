import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NOTIFICATIONS_PACKAGE_CLIENT,
  queues,
} from '@housi-nx-microservices/event-schemas';

export const notificationsRmqClientModule = ClientsModule.register([
  {
    name: NOTIFICATIONS_PACKAGE_CLIENT,
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: queues.NOTIFICATIONS,
      queueOptions: {
        durable: true,
      },
    },
  },
]);
