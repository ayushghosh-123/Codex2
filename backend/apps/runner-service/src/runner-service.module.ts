import { Module } from '@nestjs/common';
import { RunnerServiceController } from './runner-service.controller';
import { RunnerServiceService } from './runner-service.service';

@Module({
  imports: [],
  controllers: [RunnerServiceController],
  providers: [RunnerServiceService],
})
export class RunnerServiceModule {}
