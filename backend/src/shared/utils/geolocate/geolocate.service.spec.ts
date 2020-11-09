import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';
import { GeolocateService } from './geolocate.service';

describe('GeolocateService', () => {
  let service: GeolocateService;
  let httpService: HttpService;

  beforeEach(async () => {
    httpService = createMockInstance(HttpService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeolocateService,
        { provide: HttpService, useValue: httpService },
      ],
    }).compile();

    service = module.get<GeolocateService>(GeolocateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
