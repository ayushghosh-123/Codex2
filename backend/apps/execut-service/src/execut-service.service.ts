import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
