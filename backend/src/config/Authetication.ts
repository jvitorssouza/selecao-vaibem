interface IJwtAuthenticationConfig {
  secret: string;
  expiresIn: string;
  defaultStrategy: string;
}

export const AuthenticationConfig: IJwtAuthenticationConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '15d',
  defaultStrategy: 'jwt',
};
