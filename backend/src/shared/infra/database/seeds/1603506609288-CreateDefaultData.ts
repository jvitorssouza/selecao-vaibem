import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Permission } from '@modules/authentication/modules/permissions/infra/typeorm/entities/Permission';
import { ProfilesPermissions } from '@modules/authentication/modules/profiles-permissions/infra/typeorm/entities/ProfilesPermissions';
import { Profile } from '@modules/authentication/modules/profiles/infra/typeorm/entities/Profiles';
import { User } from '@modules/authentication/modules/users/infra/typeorm/entities/User';

import { permissions, profiles, profilesPermissions, users } from '.';

export class CreateDefaultData1603506609288 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository(Profile).save(profiles);
    await getRepository(Permission).save(permissions);
    await getRepository(ProfilesPermissions).save(profilesPermissions);
    await getRepository(User).save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('users');
    await queryRunner.clearTable('profiles_permissions');
    await queryRunner.clearTable('permissions');
    await queryRunner.clearTable('profiles');
  }
}
