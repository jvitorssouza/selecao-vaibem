import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { Establishment } from '../infra/typeorm/entities/Establishment';

import { EstablishmentsService } from '../services/establishments.service';

import {
  createMockRepository,
  MockRepository,
} from '@shared/infra/database/interfaces/MockRepository';

import { GeolocateService } from '@shared/utils/geolocate/geolocate.service';
import createMockInstance from 'jest-create-mock-instance';

let mockedEstablishments: Establishment[] = [];

describe('EstablishmentsService', () => {
  let service: EstablishmentsService;
  let geolocateService: GeolocateService;
  let repository: MockRepository;

  beforeAll(async () => {
    mockedEstablishments = [
      ...mockedEstablishments,
      {
        id: 1,
        document: '31325362000175',
        companyName: 'FULANOS DE TAIS ARQUITETURA E URBANISMO EIRELI',
        tradeName: 'FDT ARQUITETURA',
        addressStreet: 'Rua X',
        addressNumber: '2410',
        complement: 'Sem complemento',
        neighboorhood: 'Jereissati III',
        city: 'Maracanaú',
        state: 'CE',
        zipCode: '12340-567',
        phoneNumber: '85999998888',
        email: 'meuemail@email.com',
        status: true,
        ownerUserId: 1,
        lat: 1.23456,
        long: 2.4567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        document: '31325362000175',
        companyName: 'FULANOS DE TAIS ARQUITETURA E URBANISMO EIRELI',
        tradeName: 'FDT ARQUITETURA',
        addressStreet: 'Rua X',
        addressNumber: '2410',
        complement: 'Sem complemento',
        neighboorhood: 'Jereissati III',
        city: 'Maracanaú',
        state: 'CE',
        zipCode: '12340-567',
        phoneNumber: '85999998888',
        email: 'meuemail@email.com',
        status: true,
        ownerUserId: 1,
        lat: 1.23456,
        long: 2.4567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        document: '31325362000175',
        companyName: 'FULANOS DE TAIS ARQUITETURA E URBANISMO EIRELI',
        tradeName: 'FDT ARQUITETURA',
        addressStreet: 'Rua X',
        addressNumber: '2410',
        complement: 'Sem complemento',
        neighboorhood: 'Jereissati III',
        city: 'Maracanaú',
        state: 'CE',
        zipCode: '12340-567',
        phoneNumber: '85999998888',
        email: 'meuemail@email.com',
        status: true,
        ownerUserId: 1,
        lat: 1.23456,
        long: 2.4567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  beforeEach(async () => {
    geolocateService = createMockInstance(GeolocateService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentsService,
        {
          provide: getRepositoryToken(Establishment),
          useValue: createMockRepository(),
        },
        {
          provide: GeolocateService,
          useValue: geolocateService,
        },
      ],
    }).compile();

    service = module.get<EstablishmentsService>(EstablishmentsService);
    repository = module.get<MockRepository>(getRepositoryToken(Establishment));
  });

  afterEach(() => {
    repository.find.mockClear();
    repository.findAndCount.mockClear();
    repository.findOne.mockClear();
    repository.create.mockClear();
    repository.save.mockClear();
    repository.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('Should return establishments without pagination and filters', async () => {
      repository.find.mockReturnValue(mockedEstablishments);

      const establishments = await service.find({});

      expect(establishments).toEqual(mockedEstablishments);
    });

    it('Should return establishments paginated if pagination info was provided', async () => {
      const page = 1;
      const limit = 10;

      const paginatedEstablishments: [Establishment[], number] = [
        mockedEstablishments.slice(page - 1, limit),
        mockedEstablishments.length,
      ];

      repository.findAndCount.mockReturnValue(paginatedEstablishments);

      const establishments = await service.find({ page, limit });

      expect(establishments).toEqual(paginatedEstablishments);
    });

    it('Should return establishment filtered if it are applied', async () => {
      const establishmentsMatched = mockedEstablishments.filter(item =>
        item.companyName.includes('FULANO'),
      );

      repository.find.mockReturnValue(establishmentsMatched);

      const establishments = await service.find({
        filter: { companyName: 'FULANO' },
      });

      expect(establishments).toEqual(establishmentsMatched);
    });
  });

  describe('Find One', () => {
    it('Should return establishment by ID', async () => {
      const index = 1;

      repository.findOne.mockReturnValue(mockedEstablishments[index]);

      const establishment = await service.findOne(
        mockedEstablishments[index].id,
      );

      expect(establishment.companyName).toEqual(
        mockedEstablishments[index].companyName,
      );
    });

    it('Should throw NotFoundException if establishment by ID is not found', async () => {
      const index = 4;

      repository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(mockedEstablishments[index].id);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Create', () => {
    it('Should create new establishment', async () => {
      const establishment: Partial<Establishment> = {
        document: '31325362000175',
        companyName: 'FULANOS DE TAIS ARQUITETURA E URBANISMO EIRELI',
        tradeName: 'FDT ARQUITETURA',
        addressStreet: 'Rua X',
        addressNumber: '2410',
        complement: 'Sem complemento',
        neighboorhood: 'Jereissati III',
        state: 'CE',
        zipCode: '12340-567',
        phoneNumber: '85999998888',
        ownerUserId: 1,
        lat: 1.23456,
        long: 2.4567,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.find.mockReturnValue([]);

      repository.create.mockReturnValue(establishment);

      repository.save.mockReturnValue({
        id: 1,
        ...establishment,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      geolocateService.geolocate = jest.fn().mockReturnValue({
        type: '',
        query: [],
        features: [
          {
            id: '',
            type: '',
            place_type: [],
            relevance: 1,
            properties: {
              accuracy: '',
            },
            text: '',
            place_name: '',
            center: [-38.11111, -48.22222],
            geometry: {
              type: '',
              coordinates: [1.1111, 2.2222],
              interpolated: false,
              omitted: true,
            },
            context: [],
            address: '',
          },
        ],
        attribution: '',
      });

      const newEstablishment = await service.create(establishment);

      expect(newEstablishment).toHaveProperty('id');
      expect(newEstablishment).toHaveProperty('createdAt');
      expect(newEstablishment).toHaveProperty('updatedAt');
    });
  });

  // describe('Update', () => {});

  describe('Destroy', () => {
    it('Should throw NotFoundException if establishment not found', async () => {
      const id = 1;

      repository.findOne.mockReturnValue(undefined);

      try {
        await service.destroy(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should destroy establishment if it was found', async () => {
      const id = 1;

      const establishment = mockedEstablishments[0];

      repository.findOne.mockReturnValue(establishment);
      repository.delete.mockReturnValue(establishment);

      const destroyed = await service.destroy(id);

      expect(destroyed).toEqual(establishment);
    });
  });
});
