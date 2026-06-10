import { Test, TestingModule } from '@nestjs/testing';
import { RunnerServiceController } from './runner-service.controller';
import { RunnerServiceService } from './runner-service.service';

describe('RunnerServiceController', () => {
  let runnerServiceController: RunnerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RunnerServiceController],
      providers: [RunnerServiceService],
    }).compile();

    runnerServiceController = app.get<RunnerServiceController>(RunnerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(runnerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
