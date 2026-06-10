import { Injectable } from '@nestjs/common';

@Injectable()
export class CollabServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
