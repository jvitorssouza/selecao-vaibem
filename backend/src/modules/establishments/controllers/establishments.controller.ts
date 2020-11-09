import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';
import { Establishment } from '../infra/typeorm/entities/Establishment';
import { EstablishmentsService } from '../services/establishments.service';

@UseGuards(AuthGuard('jwt'))
@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Get()
  async find(
    @Query() parameters: IFindAllEntity<Establishment>,
  ): Promise<Establishment[] | [Establishment[], number]> {
    try {
      const establishments = await this.establishmentsService.find(parameters);
      return establishments;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Establishment | undefined> {
    try {
      const establishment = await this.establishmentsService.findOne(id);
      return establishment;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() data: Establishment): Promise<Establishment> {
    try {
      const establishment = await this.establishmentsService.create(data);
      return establishment;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Establishment,
  ): Promise<Establishment> {
    try {
      const establishment = await this.establishmentsService.update(id, data);
      return establishment;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<Establishment> {
    try {
      const establishment = await this.establishmentsService.destroy(id);
      return establishment;
    } catch (error) {
      throw error;
    }
  }
}
