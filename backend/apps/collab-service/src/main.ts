import { NestFactory } from '@nestjs/core';
import { CollabServiceModule } from './collab-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CollabServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
