import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Permission } from '../infra/typeorm/entities/Permission';
import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepo: Repository<Permission>,
  ) {}

  async find({
    page,
    limit,
    filter,
  }: IFindAllEntity<Permission>): Promise<
    Permission[] | [Permission[], number]
  > {
    try {
      let permissions: Permission[] | [Permission[], number];

      if (page && limit) {
        permissions = await this.permissionsRepo.findAndCount({
          where: {
            ...filter,
          },
          skip: (page - 1) * limit,
          take: limit,
        });
      }

      if (!page || !limit) {
        permissions = await this.permissionsRepo.find({
          ...filter,
        });
      }

      return permissions;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Permission> {
    try {
      const permission = await this.permissionsRepo.findOne(id);

      if (!permission) {
        throw new NotFoundException('Permissão não encontrada!');
      }

      return permission;
    } catch (error) {
      throw error;
    }
  }

  async create(data: Partial<Permission>): Promise<Permission> {
    try {
      const create = await this.permissionsRepo.create(data);
      const permission = await this.permissionsRepo.save(create);

      return permission;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<Permission>): Promise<Permission> {
    try {
      const permission = await this.permissionsRepo.findOne(id);

      const saveProfile = {
        ...permission,
        ...data,
      };

      const updated = await this.permissionsRepo.save(saveProfile);

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: number): Promise<Permission> {
    try {
      const permission = await this.permissionsRepo.findOne(id);

      if (!permission) {
        throw new NotFoundException('Permissão não encontrada!');
      }

      await this.permissionsRepo.delete({
        id,
      });

      return permission;
    } catch (error) {
      throw error;
    }
  }
}
