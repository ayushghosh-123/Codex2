import { NestFactory } from '@nestjs/core';
import { FileServiceModule } from './file-service.module';

async function bootstrap() {
  const app = await NestFactory.create(FileServiceModule);
  const port = process.env.FILE_SERVICE_PORT || 4003;
  await app.listen(port);
  console.log(`File Service is running on: http://localhost:${port}`);
}
bootstrap();
