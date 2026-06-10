import { NestFactory } from '@nestjs/core';
import { ExecutServiceModule } from './execut-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ExecutServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
