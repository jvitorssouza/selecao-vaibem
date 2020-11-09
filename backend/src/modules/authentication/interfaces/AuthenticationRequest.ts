import { IsDefined, IsEmail } from 'class-validator';

export class IAuthenticationRequest {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
