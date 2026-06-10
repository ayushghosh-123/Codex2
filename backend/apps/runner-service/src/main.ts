import { NestFactory } from '@nestjs/core';
import { RunnerServiceModule } from './runner-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RunnerServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
