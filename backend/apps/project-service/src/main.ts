import { NestFactory } from '@nestjs/core';
import { ProjectServiceModule } from './project-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProjectServiceModule);
  const port = process.env.PROJECT_SERVICE_PORT || 4002;
  await app.listen(port);
  console.log(`Project Service is running on: http://localhost:${port}`);
}
bootstrap();
