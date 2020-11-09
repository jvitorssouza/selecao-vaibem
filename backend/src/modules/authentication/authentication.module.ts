import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationConfig } from '@config/Authetication';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ProfilesPermissionsModule } from './modules/profiles-permissions/profiles-permissions.module';
import { JwtStrategy } from './services/jwt-strategy.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: AuthenticationConfig.defaultStrategy,
    }),
    JwtModule.register({
      secret: AuthenticationConfig.secret,
      signOptions: { expiresIn: AuthenticationConfig.expiresIn },
    }),
    UsersModule,
    ProfilesModule,
    PermissionsModule,
    ProfilesPermissionsModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
