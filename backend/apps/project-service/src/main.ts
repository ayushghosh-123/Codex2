import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProjectServiceModule } from './project-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(process.env.PROJECT_SERVICE_PORT) || 4002,
      },
    },
  );
  await app.listen();
  console.log(`Project Service listening on TCP :${process.env.PROJECT_SERVICE_PORT || 4002}`);
}
bootstrap();
