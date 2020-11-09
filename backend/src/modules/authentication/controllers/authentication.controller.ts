import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthenticationRequest } from '../interfaces/AuthenticationRequest';
import { IAuthenticationResponse } from '../interfaces/AuthenticationResponse';

import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject('AuthenticationService')
    private readonly authenticate: AuthenticationService,
  ) {}

  @Post('login')
  async login(
    @Body() data: IAuthenticationRequest,
  ): Promise<IAuthenticationResponse> {
    try {
      const token = await this.authenticate.execute(data);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
