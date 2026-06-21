import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationServiceModule } from './notification-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(process.env.NOTIFICATION_SERVICE_PORT) || 4009,
      },
    },
  );
  await app.listen();
  console.log(`Notification Service listening on TCP :${process.env.NOTIFICATION_SERVICE_PORT || 4009}`);
}
bootstrap();
