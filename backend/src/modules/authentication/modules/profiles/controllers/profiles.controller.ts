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
import { Profile } from '../infra/typeorm/entities/Profiles';
import { ProfilesService } from '../services/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async find(
    @Query() parameters: IFindAllEntity<Profile>,
  ): Promise<Profile[] | [Profile[], number]> {
    try {
      const profiles = await this.profilesService.find(parameters);
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number): Promise<Profile | undefined> {
    try {
      const profiles = await this.profilesService.findOne(id);
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: Profile): Promise<Profile> {
    try {
      const profiles = await this.profilesService.create(data);
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body() data: Profile,
  ): Promise<Profile> {
    try {
      const profiles = await this.profilesService.update(id, data);
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async destroy(@Param('id') id: number): Promise<Profile> {
    try {
      const profiles = await this.profilesService.destroy(id);
      return profiles;
    } catch (error) {
      throw error;
    }
  }
}
