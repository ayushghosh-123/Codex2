import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RunnerServiceService } from './runner-service.service';

@Controller()
export class RunnerServiceController {
  constructor(private readonly runnerServiceService: RunnerServiceService) {}

  @Get()
  getHello(): string {
    return this.runnerServiceService.getHello();
  }

  @MessagePattern({ cmd: 'service.health' })
  health() {
    return {
      service: 'runner-service',
      status: 'ok',
      port: Number(process.env.RUNNER_SERVICE_PORT) || 4007,
    };
  }
}
