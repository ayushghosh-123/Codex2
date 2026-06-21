import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectServiceService } from './project-service.service';

@Controller()
export class ProjectServiceController {
  constructor(private readonly projectService: ProjectServiceService) { }

  @MessagePattern({ cmd: 'project.create' })
  create(@Payload() data: { name: string; ownerId: string }) {
    return this.projectService.create(data);
  }

  @MessagePattern({ cmd: 'project.findAll' })
  findAll(@Payload() data: { userId: string }) {
    return this.projectService.findAll(data.userId);
  }

  @MessagePattern({ cmd: 'project.findOne' })
  findOne(@Payload() data: { projectId: string }) {
    return this.projectService.findOne(data.projectId);
  }

  @MessagePattern({ cmd: 'project.delete' })
  delete(@Payload() data: { projectId: string }) {
    return this.projectService.delete(data.projectId);
  }
}
