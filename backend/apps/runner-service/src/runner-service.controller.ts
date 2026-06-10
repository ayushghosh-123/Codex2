import { Controller, Get } from '@nestjs/common';
import { RunnerServiceService } from './runner-service.service';

@Controller()
export class RunnerServiceController {
  constructor(private readonly runnerServiceService: RunnerServiceService) {}

  @Get()
  getHello(): string {
    return this.runnerServiceService.getHello();
  }
}
