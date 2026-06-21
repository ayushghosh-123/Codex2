import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationServiceService {
  send(data: { userId: string; message: string; type: string }) {
    console.log(`[Notification Alert] User ${data.userId}: ${data.message}`);
    return { dispatched: true };
  }
}
