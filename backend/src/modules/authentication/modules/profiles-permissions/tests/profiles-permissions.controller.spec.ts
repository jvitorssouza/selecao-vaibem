import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';

import { ProfilesPermissionsController } from '../controllers/profiles-permissions.controller';
import { ProfilesPermissionsService } from '../services/profiles-permissions.service';

describe('ProfilesPermissionsController', () => {
  let controller: ProfilesPermissionsController;
  let profilesPermissionsService: ProfilesPermissionsService;

  beforeEach(async () => {
    profilesPermissionsService = createMockInstance(ProfilesPermissionsService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesPermissionsController],
      providers: [
        {
          provide: ProfilesPermissionsService,
          useValue: profilesPermissionsService,
        },
      ],
    }).compile();

    controller = module.get<ProfilesPermissionsController>(
      ProfilesPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
