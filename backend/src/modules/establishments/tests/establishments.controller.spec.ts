import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';

import { EstablishmentsController } from '../controllers/establishments.controller';
import { EstablishmentsService } from '../services/establishments.service';

describe('EstablishmentsController', () => {
  let controller: EstablishmentsController;
  let service: EstablishmentsService;

  beforeEach(async () => {
    service = createMockInstance(EstablishmentsService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentsController],
      providers: [
        {
          provide: EstablishmentsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<EstablishmentsController>(EstablishmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
