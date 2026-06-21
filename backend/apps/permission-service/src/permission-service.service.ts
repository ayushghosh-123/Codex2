import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionServiceService {
  check(data: { userId: string; projectId: string; action: string }): boolean {
    console.log(`Permission checked: User ${data.userId} on Project ${data.projectId}`);
    return true; // Stub: defaults to allow
  }

  grant(data: { userId: string; projectId: string; role: string }) {
    return { success: true };
  }
}
