import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { Permission } from '../infra/typeorm/entities/Permission';

import { PermissionsService } from '../services/permissions.service';

import {
  createMockRepository,
  MockRepository,
} from '@shared/infra/database/interfaces/MockRepository';

let mockedPermissions: Permission[] = [];

describe('PermissionsService', () => {
  let service: PermissionsService;
  let permissionsRepository: MockRepository;

  beforeAll(async () => {
    for (let i = 0; i < 100; i++) {
      mockedPermissions = [
        ...mockedPermissions,
        {
          id: 1,
          name: 'Listar todos os tickets',
          slug: 'tickets.list.all',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Atender Tickets',
          slug: 'tickets.attend',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    permissionsRepository = module.get<MockRepository>(
      getRepositoryToken(Permission),
    );
  });

  afterEach(() => {
    permissionsRepository.find.mockClear();
    permissionsRepository.findAndCount.mockClear();
    permissionsRepository.findOne.mockClear();
    permissionsRepository.create.mockClear();
    permissionsRepository.save.mockClear();
    permissionsRepository.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('Should return permissions without pagination and filters', async () => {
      permissionsRepository.find.mockReturnValue(mockedPermissions);

      const permissions = await service.find({});

      expect(permissions).toEqual(mockedPermissions);
    });

    it('Should return permissions paginated if pagination info was provided', async () => {
      const page = 1;
      const limit = 10;

      const paginatedPermissions: [Permission[], number] = [
        mockedPermissions.slice(page - 1, limit),
        mockedPermissions.length,
      ];

      permissionsRepository.findAndCount.mockReturnValue(paginatedPermissions);

      const permissions = await service.find({ page, limit });

      expect(permissions).toEqual(paginatedPermissions);
    });

    it('Should return permissions filtered if it are applied', async () => {
      const permissionsMatched = mockedPermissions.filter(item =>
        item.name.includes('Listar todos os tickets'),
      );

      permissionsRepository.find.mockReturnValue(permissionsMatched);

      const permissions = await service.find({
        filter: { name: 'Listar todos os tickets' },
      });

      expect(permissions).toEqual(permissionsMatched);
    });
  });

  describe('Find One', () => {
    it('Should return permission by ID', async () => {
      const index = 1;

      permissionsRepository.findOne.mockReturnValue(mockedPermissions[index]);

      const permission = await service.findOne(mockedPermissions[index].id);

      expect(permission.name).toEqual(mockedPermissions[index].name);
    });

    it('Should throw NotFoundException if permission by ID is not found', async () => {
      const index = 50;

      permissionsRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(mockedPermissions[index].id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Create', () => {
    it('Should create new permission', async () => {
      const permission: Partial<Permission> = {
        name: 'Criar Tags',
        slug: 'tags.create',
      };

      permissionsRepository.find.mockReturnValue([]);

      permissionsRepository.create.mockReturnValue(permission);

      permissionsRepository.save.mockReturnValue({
        id: 1,
        ...permission,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newPermission = await service.create(permission);

      expect(newPermission).toHaveProperty('id');
      expect(newPermission).toHaveProperty('createdAt');
      expect(newPermission).toHaveProperty('updatedAt');
    });
  });

  // describe('Update', () => {});

  describe('Destroy', () => {
    it('Should throw NotFoundException if permission not found', async () => {
      const id = 1;

      permissionsRepository.findOne.mockReturnValue(undefined);

      try {
        await service.destroy(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should destroy permission if it was found', async () => {
      const id = 1;

      const permission = {
        id,
        name: 'Criar Tags',
        slug: 'tags.create',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      permissionsRepository.findOne.mockReturnValue(permission);
      permissionsRepository.delete.mockReturnValue(permission);

      const destroyed = await service.destroy(id);

      expect(destroyed).toEqual(permission);
    });
  });
});
