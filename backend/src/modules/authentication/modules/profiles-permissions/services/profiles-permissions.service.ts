import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProfilesPermissions } from '../infra/typeorm/entities/ProfilesPermissions';
import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';

@Injectable()
export class ProfilesPermissionsService {
  constructor(
    @InjectRepository(ProfilesPermissions)
    private readonly profilesPermissionsRepo: Repository<ProfilesPermissions>,
  ) {}

  async find({
    page,
    limit,
    filter,
  }: IFindAllEntity<ProfilesPermissions>): Promise<
    ProfilesPermissions[] | [ProfilesPermissions[], number]
  > {
    try {
      let profilePermissions:
        | ProfilesPermissions[]
        | [ProfilesPermissions[], number];

      if (page && limit) {
        profilePermissions = await this.profilesPermissionsRepo.findAndCount({
          where: {
            ...filter,
          },
          skip: (page - 1) * limit,
          take: limit,
        });
      }

      if (!page || !limit) {
        profilePermissions = await this.profilesPermissionsRepo.find({
          ...filter,
        });
      }

      return profilePermissions;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProfilesPermissions> {
    try {
      const profilePermission = await this.profilesPermissionsRepo.findOne(id);

      if (!profilePermission) {
        throw new NotFoundException('Perfil Permissão não encontrada!');
      }

      return profilePermission;
    } catch (error) {
      throw error;
    }
  }

  async create(
    data: Partial<ProfilesPermissions>,
  ): Promise<ProfilesPermissions> {
    try {
      const create = await this.profilesPermissionsRepo.create(data);
      const profilePermission = await this.profilesPermissionsRepo.save(create);

      return profilePermission;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    data: Partial<ProfilesPermissions>,
  ): Promise<ProfilesPermissions> {
    try {
      const profilePermission = await this.profilesPermissionsRepo.findOne(id);

      const saveProfile = {
        ...profilePermission,
        ...data,
      };

      const updated = await this.profilesPermissionsRepo.save(saveProfile);

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: number): Promise<ProfilesPermissions> {
    try {
      const profilePermission = await this.profilesPermissionsRepo.findOne(id);

      if (!profilePermission) {
        throw new NotFoundException('Perfil Permissão não encontrada!');
      }

      await this.profilesPermissionsRepo.delete({
        id,
      });

      return profilePermission;
    } catch (error) {
      throw error;
    }
  }
}
