import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationServiceService } from './notification-service.service';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notifService: NotificationServiceService) {}

  @EventPattern('notification.send')
  handleNotification(@Payload() data: { userId: string; message: string; type: string }) {
    return this.notifService.send(data);
  }

  @MessagePattern({ cmd: 'notification.send' })
  sendDirect(@Payload() data: { userId: string; message: string; type: string }) {
    return this.notifService.send(data);
  }
}
