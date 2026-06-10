import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
