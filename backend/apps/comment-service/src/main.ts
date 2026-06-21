import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommentServiceModule } from './comment-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommentServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(process.env.COMMENT_SERVICE_PORT) || 4005,
      },
    },
  );
  await app.listen();
  console.log(`Comment Service listening on TCP :${process.env.COMMENT_SERVICE_PORT || 4005}`);
}
bootstrap();
