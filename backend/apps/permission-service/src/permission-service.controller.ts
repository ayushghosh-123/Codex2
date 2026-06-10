import { Controller, Get } from '@nestjs/common';
import { PermissionServiceService } from './permission-service.service';

@Controller()
export class PermissionServiceController {
  constructor(private readonly permissionServiceService: PermissionServiceService) {}

  @Get()
  getHello(): string {
    return this.permissionServiceService.getHello();
  }
}
