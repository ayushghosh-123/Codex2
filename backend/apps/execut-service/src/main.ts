import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ExecutServiceModule } from './execut-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ExecutServiceModule);
  const port = Number(process.env.EXECUT_SERVICE_PORT) || 4006;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port },
  });

  await app.startAllMicroservices();
  console.log(`Execut Service TCP microservice is running on port ${port}`);
}

bootstrap();
