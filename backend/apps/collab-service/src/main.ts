import { NestFactory } from '@nestjs/core';
import { CollabServiceModule } from './collab-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CollabServiceModule);
  const port = process.env.COLLAB_SERVICE_PORT || 4004;
  await app.listen(port);
  console.log(`Collab Service is running on: http://localhost:${port}`);
}
bootstrap();
