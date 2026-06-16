import { NestFactory } from '@nestjs/core';
import { PermissionServiceModule } from './permission-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PermissionServiceModule);
  const port = process.env.PERMISSION_SERVICE_PORT || 4008;
  await app.listen(port);
  console.log(`Permission Service is running on: http://localhost:${port}`);
}
bootstrap();
