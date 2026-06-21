import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectServiceService {
  create(data: { name: string; ownerId: string }) {
    console.log('Creating project:', data.name);
    return { id: 'stub-project-id', name: data.name, ownerId: data.ownerId };
  }

  findAll(userId: string) {
    return [{ id: 'stub-project-id', name: 'Demo Project', ownerId: userId }];
  }

  findOne(projectId: string) {
    return { id: projectId, name: 'Demo Project' };
  }

  delete(projectId: string) {
    console.log('Deleting project:', projectId);
    return { success: true };
  }
}
