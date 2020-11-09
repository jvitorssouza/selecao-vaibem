import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './infra/typeorm/entities/User';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { FindUserByEmailService } from './services/find-user-by-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, FindUserByEmailService],
  exports: [
    UsersService,
    FindUserByEmailService,
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
