import { NestFactory } from '@nestjs/core';
import { CommentServiceModule } from './comment-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentServiceModule);
  const port = process.env.COMMENT_SERVICE_PORT || 4005;
  await app.listen(port);
  console.log(`Comment Service is running on: http://localhost:${port}`);
}
bootstrap();
