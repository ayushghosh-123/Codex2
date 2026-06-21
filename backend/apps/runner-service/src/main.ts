import { NestFactory } from '@nestjs/core';
import { RunnerServiceModule } from './runner-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RunnerServiceModule);
  await app.listen(4017); // Health check endpoint
  console.log(`Runner Service consuming queue...`);
}
bootstrap();
