import {Api} from '../Configs/Api';

export const AuthService = {
  signIn: async (email: string, password: string) => {
    return await Api.post('authentication/login', {
      email,
      password,
    });
  },
};
