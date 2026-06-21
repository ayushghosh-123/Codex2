import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExecutServiceService } from './execut-service.service';

@Controller()
export class ExecutServiceController {
  constructor(private readonly executService: ExecutServiceService) {}

  @MessagePattern({ cmd: 'execut.run' })
  run(@Payload() data: { projectId: string; language: string; code: string }) {
    return this.executService.enqueueRun(data);
  }
}
