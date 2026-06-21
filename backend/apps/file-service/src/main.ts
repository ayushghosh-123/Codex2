import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FileServiceModule } from './file-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(process.env.FILE_SERVICE_PORT) || 4003,
      },
    },
  );
  await app.listen();
  console.log(`File Service listening on TCP :${process.env.FILE_SERVICE_PORT || 4003}`);
}
bootstrap();
