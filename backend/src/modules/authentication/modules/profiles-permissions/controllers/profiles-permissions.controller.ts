import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';
import { ProfilesPermissions } from '../infra/typeorm/entities/ProfilesPermissions';
import { ProfilesPermissionsService } from '../services/profiles-permissions.service';

@Controller('profiles-permissions')
export class ProfilesPermissionsController {
  constructor(
    private readonly profilesPermissionsService: ProfilesPermissionsService,
  ) {}

  @Get()
  async find(
    @Query() parameters: IFindAllEntity<ProfilesPermissions>,
  ): Promise<ProfilesPermissions[] | [ProfilesPermissions[], number]> {
    try {
      const profilesPermissions = await this.profilesPermissionsService.find(
        parameters,
      );
      return profilesPermissions;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ProfilesPermissions | undefined> {
    try {
      const profilePermission = await this.profilesPermissionsService.findOne(
        id,
      );
      return profilePermission;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(
    @Body() data: ProfilesPermissions,
  ): Promise<ProfilesPermissions> {
    try {
      const profilePermission = await this.profilesPermissionsService.create(
        data,
      );
      return profilePermission;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: ProfilesPermissions,
  ): Promise<ProfilesPermissions> {
    try {
      const profilePermission = await this.profilesPermissionsService.update(
        id,
        data,
      );

      return profilePermission;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<ProfilesPermissions> {
    try {
      const profilePermission = await this.profilesPermissionsService.destroy(
        id,
      );

      return profilePermission;
    } catch (error) {
      throw error;
    }
  }
}
