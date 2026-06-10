import { Injectable } from '@nestjs/common';

@Injectable()
export class RunnerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
