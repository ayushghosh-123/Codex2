import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);
  const port = process.env.NOTIFICATION_SERVICE_PORT || 4009;
  await app.listen(port);
  console.log(`Notification Service is running on: http://localhost:${port}`);
}
bootstrap();
