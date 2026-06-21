import { NestFactory } from '@nestjs/core';
import { CollabServiceModule } from './collab-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CollabServiceModule);
  app.enableCors({ origin: '*' });
  const port = process.env.COLLAB_SERVICE_PORT || 4004;
  await app.listen(port);
  console.log(`Collab Service (WebSocket) is running on: http://localhost:${port}`);
}
bootstrap();
