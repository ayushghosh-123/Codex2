import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentServiceService } from './comment-service.service';

@Controller()
export class CommentServiceController {
  constructor(private readonly commentService: CommentServiceService) {}

  @MessagePattern({ cmd: 'comment.create' })
  create(@Payload() data: { projectId: string; userId: string; filePath: string; line: number; text: string }) {
    return this.commentService.create(data);
  }

  @MessagePattern({ cmd: 'comment.findByFile' })
  findByFile(@Payload() data: { projectId: string; filePath: string }) {
    return this.commentService.findByFile(data);
  }
}
