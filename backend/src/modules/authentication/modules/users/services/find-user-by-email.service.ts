import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../infra/typeorm/entities/User';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(email: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          email,
        },
        select: ['id', 'name', 'email', 'password', 'profileId'],
        relations: ['profile'],
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado!');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
