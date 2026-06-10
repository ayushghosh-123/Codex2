import { Test, TestingModule } from '@nestjs/testing';
import { CollabServiceController } from './collab-service.controller';
import { CollabServiceService } from './collab-service.service';

describe('CollabServiceController', () => {
  let collabServiceController: CollabServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CollabServiceController],
      providers: [CollabServiceService],
    }).compile();

    collabServiceController = app.get<CollabServiceController>(CollabServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(collabServiceController.getHello()).toBe('Hello World!');
    });
  });
});
