import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { Profile } from '../infra/typeorm/entities/Profiles';

import { ProfilesService } from '../services/profiles.service';

import {
  createMockRepository,
  MockRepository,
} from '@shared/infra/database/interfaces/MockRepository';

let mockedProfiles: Profile[] = [];

describe('ProfilesService', () => {
  let service: ProfilesService;
  let profilesRepository: MockRepository;

  beforeAll(async () => {
    for (let i = 0; i < 100; i++) {
      mockedProfiles = [
        ...mockedProfiles,
        {
          id: 1,
          name: 'Cliente',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Agente',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    profilesRepository = module.get<MockRepository>(
      getRepositoryToken(Profile),
    );
  });

  afterEach(() => {
    profilesRepository.find.mockClear();
    profilesRepository.findAndCount.mockClear();
    profilesRepository.findOne.mockClear();
    profilesRepository.create.mockClear();
    profilesRepository.save.mockClear();
    profilesRepository.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('Should return profiles without pagination and filters', async () => {
      profilesRepository.find.mockReturnValue(mockedProfiles);

      const profiles = await service.find({});

      expect(profiles).toEqual(mockedProfiles);
    });

    it('Should return profiles paginated if pagination info was provided', async () => {
      const page = 1;
      const limit = 10;

      const paginatedProfiles: [Profile[], number] = [
        mockedProfiles.slice(page - 1, limit),
        mockedProfiles.length,
      ];

      profilesRepository.findAndCount.mockReturnValue(paginatedProfiles);

      const profiles = await service.find({ page, limit });

      expect(profiles).toEqual(paginatedProfiles);
    });

    it('Should return profiles filtered if filters are applied', async () => {
      const profilesMatched = mockedProfiles.filter(item =>
        item.name.includes('Agente'),
      );

      profilesRepository.find.mockReturnValue(profilesMatched);

      const profile = await service.find({
        filter: { name: 'Agente' },
      });

      expect(profile).toEqual(profilesMatched);
    });
  });

  describe('Find One', () => {
    it('Should return profile by ID', async () => {
      const index = 1;

      profilesRepository.findOne.mockReturnValue(mockedProfiles[index]);

      const profile = await service.findOne(mockedProfiles[index].id);

      expect(profile.name).toEqual(mockedProfiles[index].name);
    });

    it('Should throw NotFoundException if profile by ID is not found', async () => {
      const index = 50;

      profilesRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(mockedProfiles[index].id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Create', () => {
    it('Should create new profile', async () => {
      const profile: Partial<Profile> = {
        name: 'Administrador',
      };

      profilesRepository.find.mockReturnValue([]);

      profilesRepository.create.mockReturnValue(profile);

      profilesRepository.save.mockReturnValue({
        id: 1,
        ...profile,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newProfile = await service.create(profile);

      expect(newProfile).toHaveProperty('id');
      expect(newProfile).toHaveProperty('createdAt');
      expect(newProfile).toHaveProperty('updatedAt');
    });
  });

  // describe('Update', () => {});

  describe('Destroy', () => {
    it('Should throw NotFoundException if profile not found', async () => {
      const id = 1;

      profilesRepository.findOne.mockReturnValue(undefined);

      try {
        await service.destroy(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should destroy profile if it was found', async () => {
      const id = 1;

      const profile = {
        id,
        name: 'Agente',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      profilesRepository.findOne.mockReturnValue(profile);
      profilesRepository.delete.mockReturnValue(profile);

      const destroyed = await service.destroy(id);

      expect(destroyed).toEqual(profile);
    });
  });
});
