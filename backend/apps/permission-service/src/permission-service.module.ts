import { Module } from '@nestjs/common';
import { PermissionServiceController } from './permission-service.controller';
import { PermissionServiceService } from './permission-service.service';

@Module({
  imports: [],
  controllers: [PermissionServiceController],
  providers: [PermissionServiceService],
})
export class PermissionServiceModule {}
