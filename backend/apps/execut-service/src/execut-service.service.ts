import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ExecutServiceService {
  constructor(
    @InjectQueue('code-execution') private readonly queue: Queue,
  ) {}

  async enqueueRun(payload: { projectId: string; language: string; code: string }) {
    const job = await this.queue.add('run', payload, { attempts: 2 });
    return { jobId: String(job.id), status: 'enqueued' };
  }
}
