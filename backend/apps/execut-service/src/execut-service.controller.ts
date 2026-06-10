import { Controller, Get } from '@nestjs/common';
import { ExecutServiceService } from './execut-service.service';

@Controller()
export class ExecutServiceController {
  constructor(private readonly executServiceService: ExecutServiceService) {}

  @Get()
  getHello(): string {
    return this.executServiceService.getHello();
  }
}
