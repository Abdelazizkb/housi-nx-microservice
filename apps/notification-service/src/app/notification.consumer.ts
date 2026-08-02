import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { notificationMessages } from '@housi-nx-microservices/event-schemas';

@Controller()
export class NotificationConsumer {
  private Logger = new Logger(NotificationConsumer.name);

  @EventPattern(notificationMessages.SEND_EMAIL_VERIFICATION)
  sendEmailVerification(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): void {
    this.Logger.log('sendEmailVerification', { data });
  }
}
