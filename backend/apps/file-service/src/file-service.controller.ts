import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileServiceService } from './file-service.service';

@Controller()
export class FileServiceController {
  constructor(private readonly fileService: FileServiceService) {}

  @MessagePattern({ cmd: 'file.get_tree' })
  getTree(@Payload() data: { userId: string; projectId: string }) {
    return this.fileService.getFileTree(data.userId, data.projectId);
  }

  @MessagePattern({ cmd: 'file.get_content' })
  getContent(@Payload() data: { userId: string; projectId: string; filePath: string }) {
    return this.fileService.getFileContent(data);
  }
}
