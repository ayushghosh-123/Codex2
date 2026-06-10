import { Test, TestingModule } from '@nestjs/testing';
import { ExecutServiceController } from './execut-service.controller';
import { ExecutServiceService } from './execut-service.service';

describe('ExecutServiceController', () => {
  let executServiceController: ExecutServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExecutServiceController],
      providers: [ExecutServiceService],
    }).compile();

    executServiceController = app.get<ExecutServiceController>(ExecutServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(executServiceController.getHello()).toBe('Hello World!');
    });
  });
});
