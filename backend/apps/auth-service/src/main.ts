import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  const port = Number(process.env.AUTH_SERVICE_PORT) || 4001;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port },
  });

  await app.startAllMicroservices();
  console.log(`Auth Service TCP microservice is running on port ${port}`);
}

bootstrap();
