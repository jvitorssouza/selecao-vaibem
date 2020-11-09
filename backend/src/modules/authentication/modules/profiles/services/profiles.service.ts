import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Profile } from '../infra/typeorm/entities/Profiles';
import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly userRepo: Repository<Profile>,
  ) {}

  async find({
    page,
    limit,
    filter,
  }: IFindAllEntity<Profile>): Promise<Profile[] | [Profile[], number]> {
    try {
      let profiles: Profile[] | [Profile[], number];

      if (page && limit) {
        profiles = await this.userRepo.findAndCount({
          where: {
            ...filter,
          },
          skip: (page - 1) * limit,
          take: limit,
        });
      }

      if (!page || !limit) {
        profiles = await this.userRepo.find({
          ...filter,
        });
      }

      return profiles;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Profile> {
    try {
      const profile = await this.userRepo.findOne(id);

      if (!profile) {
        throw new NotFoundException('Perfil não encontrado!');
      }

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async create(data: Partial<Profile>): Promise<Profile> {
    try {
      const create = await this.userRepo.create(data);
      const profile = await this.userRepo.save(create);

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<Profile>): Promise<Profile> {
    try {
      const profile = await this.userRepo.findOne(id);

      const saveProfile = {
        ...profile,
        ...data,
      };

      const updated = await this.userRepo.save(saveProfile);

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: number): Promise<Profile> {
    try {
      const profile = await this.userRepo.findOne(id);

      if (!profile) {
        throw new NotFoundException('Perfil não encontrado!');
      }

      await this.userRepo.delete({
        id,
      });

      return profile;
    } catch (error) {
      throw error;
    }
  }
}
