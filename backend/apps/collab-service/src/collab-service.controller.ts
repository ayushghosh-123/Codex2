import { Controller, Get } from '@nestjs/common';
import { CollabServiceService } from './collab-service.service';

@Controller()
export class CollabServiceController {
  constructor(private readonly collabServiceService: CollabServiceService) {}

  @Get()
  getHello(): string {
    return this.collabServiceService.getHello();
  }
}
