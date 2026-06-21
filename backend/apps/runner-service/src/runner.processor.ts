import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('code-execution')
export class RunnerProcessor extends WorkerHost {
  async process(job: Job) {
    const { projectId, language, code } = job.data as {
      projectId: string;
      language: string;
      code: string;
    };
    console.log(`Processing sandbox execution job: ${job.id} for project ${projectId} using ${language}`);
    return { stdout: 'Stub output', stderr: '', exitCode: 0 };
  }
}
