import bcrypt from 'bcrypt';

import { Permission } from '@modules/authentication/modules/permissions/infra/typeorm/entities/Permission';
import { ProfilesPermissions } from '@modules/authentication/modules/profiles-permissions/infra/typeorm/entities/ProfilesPermissions';
import { Profile } from '@modules/authentication/modules/profiles/infra/typeorm/entities/Profiles';
import { User } from '@modules/authentication/modules/users/infra/typeorm/entities/User';

export const profiles: Partial<Profile>[] = [
  {
    name: 'Superadmin',
  },
  {
    name: 'Limited',
  },
];

export const permissions: Partial<Permission>[] = [
  {
    name: 'Visualizar Estabelecimentos',
    slug: 'establishments.view',
  },
  {
    name: 'Criar Estabelecimentos',
    slug: 'establishments.create',
  },
  {
    name: 'Atualizar Estabelecimentos',
    slug: 'establishments.update',
  },
  {
    name: 'Deletar Estabelecimentos',
    slug: 'establishments.destroy',
  },
  {
    name: 'Visualizar Todos os Estabelecimentos',
    slug: 'establishments.view.all',
  },
];

export const profilesPermissions: Partial<ProfilesPermissions>[] = [
  {
    profileId: 1,
    permissionId: 1,
  },
  {
    profileId: 1,
    permissionId: 2,
  },
  {
    profileId: 1,
    permissionId: 3,
  },
  {
    profileId: 1,
    permissionId: 4,
  },
  {
    profileId: 1,
    permissionId: 5,
  },
  {
    profileId: 2,
    permissionId: 1,
  },
  {
    profileId: 2,
    permissionId: 2,
  },
  {
    profileId: 2,
    permissionId: 3,
  },
  {
    profileId: 2,
    permissionId: 4,
  },
];

export const users: Partial<User>[] = [
  {
    name: 'Super Usuário',
    email: 'super@cartaovaibem.com.br',
    profileId: 1,
    password: bcrypt.hashSync('123456', 12),
  },
  {
    name: 'Usuário Limitado',
    email: 'limited@cartaovaibem.com.br',
    profileId: 2,
    password: bcrypt.hashSync('123456', 12),
  },
];
