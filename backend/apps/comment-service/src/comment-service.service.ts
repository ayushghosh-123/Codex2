import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentServiceService {
  create(data: { projectId: string; userId: string; filePath: string; line: number; text: string }) {
    return { success: true, id: 'stub-comment-id', ...data };
  }

  findByFile(data: { projectId: string; filePath: string }) {
    return [];
  }
}
