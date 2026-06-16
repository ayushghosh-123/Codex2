import { NestFactory } from '@nestjs/core';
import { RunnerServiceModule } from './runner-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RunnerServiceModule);
  const port = process.env.RUNNER_SERVICE_PORT || 4007;
  await app.listen(port);
  console.log(`Runner Service is running on: http://localhost:${port}`);
}
bootstrap();
