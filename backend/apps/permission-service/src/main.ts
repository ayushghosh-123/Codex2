import { NestFactory } from '@nestjs/core';
import { PermissionServiceModule } from './permission-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PermissionServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
