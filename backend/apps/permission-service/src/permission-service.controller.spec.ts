import { Test, TestingModule } from '@nestjs/testing';
import { PermissionServiceController } from './permission-service.controller';
import { PermissionServiceService } from './permission-service.service';

describe('PermissionServiceController', () => {
  let permissionServiceController: PermissionServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PermissionServiceController],
      providers: [PermissionServiceService],
    }).compile();

    permissionServiceController = app.get<PermissionServiceController>(PermissionServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(permissionServiceController.getHello()).toBe('Hello World!');
    });
  });
});
