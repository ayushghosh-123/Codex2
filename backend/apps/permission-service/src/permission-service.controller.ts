import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionServiceService } from './permission-service.service';

@Controller()
export class PermissionServiceController {
  constructor(private readonly permService: PermissionServiceService) {}

  @MessagePattern({ cmd: 'permission.check' })
  check(@Payload() data: { userId: string; projectId: string; action: string }) {
    return this.permService.check(data);
  }

  @MessagePattern({ cmd: 'permission.grant' })
  grant(@Payload() data: { userId: string; projectId: string; role: string }) {
    return this.permService.grant(data);
  }
}
