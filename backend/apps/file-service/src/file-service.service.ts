import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PERMISSION_SERVICE } from './file-service.module';

@Injectable()
export class FileServiceService {
  constructor(
    @Inject(PERMISSION_SERVICE) private readonly permClient: ClientProxy,
  ) { }

  async getFileTree(userId: string, projectId: string) {
    const allowed = await firstValueFrom(
      this.permClient.send<boolean>({ cmd: 'permission.check' }, { userId, projectId, action: 'Read' }),
    );
    if (!allowed) throw new ForbiddenException('Insufficient permissions');
    return [
      { name: 'src', isDir: true, children: [{ name: 'main.ts', isDir: false }] }
    ];
  }

  async getFileContent(data: { userId: string; projectId: string; filePath: string }) {
    const allowed = await firstValueFrom(
      this.permClient.send<boolean>({ cmd: 'permission.check' }, { userId: data.userId, projectId: data.projectId, action: 'Read' }),
    );
    if (!allowed) throw new ForbiddenException('Insufficient permissions');
    return { content: 'console.log("Hello Codex2");' };
  }
}
