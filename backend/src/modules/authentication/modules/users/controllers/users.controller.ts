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
import { User } from '../infra/typeorm/entities/User';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(
    @Query() parameters: IFindAllEntity<User>,
  ): Promise<User[] | [User[], number]> {
    try {
      const users = await this.usersService.find(parameters);
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | undefined> {
    try {
      const users = await this.usersService.findOne(id);
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() data: User): Promise<User> {
    try {
      const user = await this.usersService.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: User): Promise<User> {
    try {
      const user = await this.usersService.update(id, data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.usersService.destroy(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
