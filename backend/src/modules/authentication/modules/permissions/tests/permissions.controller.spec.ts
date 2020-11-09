import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';

import { PermissionsController } from '../controllers/permissions.controller';
import { PermissionsService } from '../services/permissions.service';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    permissionsService = createMockInstance(PermissionsService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: permissionsService,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
