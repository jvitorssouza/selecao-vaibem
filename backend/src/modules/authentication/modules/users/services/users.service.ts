import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashSync } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../infra/typeorm/entities/User';
import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async find({
    page,
    limit,
    filter,
  }: IFindAllEntity<User>): Promise<User[] | [User[], number]> {
    try {
      let users: User[] | [User[], number];

      if (page && limit) {
        users = await this.userRepo.findAndCount({
          where: {
            ...filter,
          },
          skip: (page - 1) * limit,
          take: limit,
        });
      }

      if (!page || !limit) {
        users = await this.userRepo.find({
          ...filter,
        });
      }

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findOne(id);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado!');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      const emailInserted: User[] = await this.userRepo.find({
        where: {
          email: data.email,
        },
      });

      if (emailInserted.length > 0) {
        throw new InternalServerErrorException(
          'O email indicado já está sendo utilizado por outro usuário!',
        );
      }

      data.password = hashSync(data.password, 12);

      const create = await this.userRepo.create(data);
      const user = await this.userRepo.save(create);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepo.findOne(id);

      const emailInserted: User[] = await this.userRepo.find({
        where: {
          email: data.email,
        },
      });

      const isEmailOfAnotherUser = emailInserted.findIndex(
        item => item.id !== data.id,
      );

      if (emailInserted.length > 0 && isEmailOfAnotherUser > -1) {
        throw new InternalServerErrorException(
          'O email indicado já está sendo utilizado por outro usuário!',
        );
      }

      if (data?.password) {
        data.password = hashSync(data.password, 12);
      }

      const saveUser = {
        ...user,
        ...data,
      };

      const updated = await this.userRepo.save(saveUser);

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findOne(id);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado!');
      }

      await this.userRepo.delete({
        id,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
