import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { ProfilesPermissions } from '../infra/typeorm/entities/ProfilesPermissions';

import { ProfilesPermissionsService } from '../services/profiles-permissions.service';

import {
  createMockRepository,
  MockRepository,
} from '@shared/infra/database/interfaces/MockRepository';

let mockedProfilePermissions: ProfilesPermissions[] = [];

describe('ProfilesPermissionsService', () => {
  let service: ProfilesPermissionsService;
  let profilesPermissionsRepository: MockRepository;

  beforeAll(async () => {
    for (let i = 0; i < 100; i++) {
      mockedProfilePermissions = [
        ...mockedProfilePermissions,
        {
          id: 1,
          profileId: 1,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: {
            id: 1,
            name: 'Agente',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          permission: {
            id: 1,
            name: 'Visualizar Home',
            slug: 'home.view',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: 2,
          profileId: 1,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: {
            id: 1,
            name: 'Agente',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          permission: {
            id: 1,
            name: 'Visualizar Home',
            slug: 'home.view',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: 3,
          profileId: 1,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: {
            id: 1,
            name: 'Agente',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          permission: {
            id: 1,
            name: 'Visualizar Home',
            slug: 'home.view',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesPermissionsService,
        {
          provide: getRepositoryToken(ProfilesPermissions),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProfilesPermissionsService>(
      ProfilesPermissionsService,
    );
    profilesPermissionsRepository = module.get<MockRepository>(
      getRepositoryToken(ProfilesPermissions),
    );
  });

  afterEach(() => {
    profilesPermissionsRepository.find.mockClear();
    profilesPermissionsRepository.findAndCount.mockClear();
    profilesPermissionsRepository.findOne.mockClear();
    profilesPermissionsRepository.create.mockClear();
    profilesPermissionsRepository.save.mockClear();
    profilesPermissionsRepository.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('Should return profiles permissions without pagination and filters', async () => {
      profilesPermissionsRepository.find.mockReturnValue(
        mockedProfilePermissions,
      );

      const profilesPermissions = await service.find({});

      expect(profilesPermissions).toEqual(mockedProfilePermissions);
    });

    it('Should return permissions paginated if pagination info was provided', async () => {
      const page = 1;
      const limit = 10;

      const paginatedProfilesPermissions: [ProfilesPermissions[], number] = [
        mockedProfilePermissions.slice(page - 1, limit),
        mockedProfilePermissions.length,
      ];

      profilesPermissionsRepository.findAndCount.mockReturnValue(
        paginatedProfilesPermissions,
      );

      const permissions = await service.find({ page, limit });

      expect(permissions).toEqual(paginatedProfilesPermissions);
    });

    it('Should return permissions filtered if it are applied', async () => {
      const profilesPermissionsMatched = mockedProfilePermissions.filter(
        item => item.permissionId === mockedProfilePermissions[1].permissionId,
      );

      profilesPermissionsRepository.find.mockReturnValue(
        profilesPermissionsMatched,
      );

      const permissions = await service.find({
        filter: mockedProfilePermissions[1],
      });

      expect(permissions).toEqual(profilesPermissionsMatched);
    });
  });

  describe('Find One', () => {
    it('Should return profile permission by ID', async () => {
      const index = 1;

      profilesPermissionsRepository.findOne.mockReturnValue(
        mockedProfilePermissions[index],
      );

      const permission = await service.findOne(
        mockedProfilePermissions[index].id,
      );

      expect(permission.permissionId).toEqual(
        mockedProfilePermissions[index].permissionId,
      );
    });

    it('Should throw NotFoundException if profile permission by ID is not found', async () => {
      const index = 50;

      profilesPermissionsRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(mockedProfilePermissions[index].id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Create', () => {
    it('Should create new permission', async () => {
      const profilePermission: Partial<ProfilesPermissions> = {
        profileId: 1,
        permissionId: 1,
      };

      profilesPermissionsRepository.find.mockReturnValue([]);

      profilesPermissionsRepository.create.mockReturnValue(profilePermission);

      profilesPermissionsRepository.save.mockReturnValue({
        id: 1,
        ...profilePermission,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newPermission = await service.create(profilePermission);

      expect(newPermission).toHaveProperty('id');
      expect(newPermission).toHaveProperty('createdAt');
      expect(newPermission).toHaveProperty('updatedAt');
    });
  });

  // describe('Update', () => {});

  describe('Destroy', () => {
    it('Should throw NotFoundException if profile permission not found', async () => {
      const id = 1;

      profilesPermissionsRepository.findOne.mockReturnValue(undefined);

      try {
        await service.destroy(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should destroy profile permission if it was found', async () => {
      const id = 1;

      const profilePermission = {
        id,
        profileId: 1,
        permissionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      profilesPermissionsRepository.findOne.mockReturnValue(profilePermission);
      profilesPermissionsRepository.delete.mockReturnValue(profilePermission);

      const destroyed = await service.destroy(id);

      expect(destroyed).toEqual(profilePermission);
    });
  });
});
