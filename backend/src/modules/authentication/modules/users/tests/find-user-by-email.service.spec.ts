import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  createMockRepository,
  MockRepository,
} from '@shared/infra/database/interfaces/MockRepository';
import { User } from '../infra/typeorm/entities/User';
import { FindUserByEmailService } from '../services/find-user-by-email.service';

describe('FindUserByEmailService', () => {
  let service: FindUserByEmailService;
  let usersRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
    usersRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Execute', () => {
    it("Should throw NotFoundException when user wasn't found", async () => {
      usersRepository.findOne.mockReturnValue(undefined);

      try {
        await service.execute('email@email.com');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
