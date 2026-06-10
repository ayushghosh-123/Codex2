import { Module } from '@nestjs/common';
import { ExecutServiceController } from './execut-service.controller';
import { ExecutServiceService } from './execut-service.service';

@Module({
  imports: [],
  controllers: [ExecutServiceController],
  providers: [ExecutServiceService],
})
export class ExecutServiceModule {}
