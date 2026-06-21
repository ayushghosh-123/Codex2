import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CollabServiceService } from './collab-service.service';

@Controller()
export class CollabServiceController {
  constructor(private readonly collabServiceService: CollabServiceService) {}

  @Get()
  getHello(): string {
    return this.collabServiceService.getHello();
  }

  @MessagePattern({ cmd: 'service.health' })
  health() {
    return {
      service: 'collab-service',
      status: 'ok',
      port: Number(process.env.COLLAB_SERVICE_PORT) || 4004,
    };
  }
}
