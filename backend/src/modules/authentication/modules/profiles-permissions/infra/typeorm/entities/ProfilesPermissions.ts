import { IsDefined, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Permission } from '@modules/authentication/modules/permissions/infra/typeorm/entities/Permission';
import { Profile } from '@modules/authentication/modules/profiles/infra/typeorm/entities/Profiles';

@Entity('profiles_permissions')
export class ProfilesPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsNumber()
  @Column({ name: 'profile_id' })
  profileId: number;

  @IsDefined()
  @IsNumber()
  @Column({ name: 'permission_id' })
  permissionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Profile, { eager: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToOne(() => Permission, { eager: true })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
