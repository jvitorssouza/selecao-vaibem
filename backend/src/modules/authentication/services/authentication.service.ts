import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { IAuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { IAuthenticationRequest } from '../interfaces/AuthenticationRequest';
import { FindUserByEmailService } from '../modules/users/services/find-user-by-email.service';
import { ProfilesPermissionsService } from '../modules/profiles-permissions/services/profiles-permissions.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('FindUserByEmailService')
    private readonly findUserByEmail: FindUserByEmailService,
    private readonly profilePermissionsService: ProfilesPermissionsService,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticationRequest): Promise<IAuthenticationResponse> {
    try {
      const user = await this.findUserByEmail.execute(email);

      if (!user || !compareSync(password, user?.password)) {
        throw new UnauthorizedException('Senha incorreta!');
      }

      delete user.password;

      const permissions = await this.profilePermissionsService.find({
        filter: {
          profileId: user.profileId,
        },
      });

      const payload = {
        user,
        permissions,
      };

      return { token: await this.jwtService.sign(payload) };
    } catch (error) {
      throw error;
    }
  }
}
