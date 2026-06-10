import { Module } from '@nestjs/common';
import { CollabServiceController } from './collab-service.controller';
import { CollabServiceService } from './collab-service.service';

@Module({
  imports: [],
  controllers: [CollabServiceController],
  providers: [CollabServiceService],
})
export class CollabServiceModule {}
