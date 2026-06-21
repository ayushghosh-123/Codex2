import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ExecutServiceController } from './execut-service.controller';
import { ExecutServiceService } from './execut-service.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({ name: 'code-execution' }),
  ],
  controllers: [ExecutServiceController],
  providers: [ExecutServiceService],
})
export class ExecutServiceModule {}
