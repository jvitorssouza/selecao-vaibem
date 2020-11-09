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
import { Permission } from '../infra/typeorm/entities/Permission';
import { PermissionsService } from '../services/permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async find(
    @Query() parameters: IFindAllEntity<Permission>,
  ): Promise<Permission[] | [Permission[], number]> {
    try {
      const permissions = await this.permissionsService.find(parameters);
      return permissions;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Permission | undefined> {
    try {
      const permission = await this.permissionsService.findOne(id);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() data: Permission): Promise<Permission> {
    try {
      const permission = await this.permissionsService.create(data);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Permission,
  ): Promise<Permission> {
    try {
      const permission = await this.permissionsService.update(id, data);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<Permission> {
    try {
      const permission = await this.permissionsService.destroy(id);
      return permission;
    } catch (error) {
      throw error;
    }
  }
}
