import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PermissionServiceModule } from './permission-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PermissionServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(process.env.PERMISSION_SERVICE_PORT) || 4008,
      },
    },
  );
  await app.listen();
  console.log(`Permission Service listening on TCP :${process.env.PERMISSION_SERVICE_PORT || 4008}`);
}
bootstrap();
