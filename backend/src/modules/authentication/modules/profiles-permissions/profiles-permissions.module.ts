import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfilesPermissions } from './infra/typeorm/entities/ProfilesPermissions';

import { ProfilesPermissionsController } from './controllers/profiles-permissions.controller';
import { ProfilesPermissionsService } from './services/profiles-permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilesPermissions])],
  controllers: [ProfilesPermissionsController],
  providers: [ProfilesPermissionsService],
  exports: [ProfilesPermissionsService],
})
export class ProfilesPermissionsModule {}
