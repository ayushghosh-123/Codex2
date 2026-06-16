import { NestFactory } from '@nestjs/core';
import { ExecutServiceModule } from './execut-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ExecutServiceModule);
  const port = process.env.EXECUT_SERVICE_PORT || 4006;
  await app.listen(port);
  console.log(`Execut Service is running on: http://localhost:${port}`);
}
bootstrap();
