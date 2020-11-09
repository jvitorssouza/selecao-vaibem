import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Api} from '../../Configs/Api';

interface Profile {
  id: number;
  name: string;
}

interface Token {
  iat: number;
  exp: number;
  str: string;
}

interface LoggedUser {
  id: number;
  name: string;
  email: string;
  profileId: number;
  profile: Profile;
  token: Token;
  permissions: string[];
}

export const InitialUser = {
  id: 0,
  name: '',
  email: '',
  profileId: 0,
  profile: {
    id: 0,
    name: '',
  },
  token: {
    exp: 0,
    iat: 0,
    str: '',
  },
  permissions: [],
};

export const AuthenticationContext = createContext<{
  user: LoggedUser | null;
  setUser: Function;
  loading: boolean;
  setLoading: Function;
}>({
  user: InitialUser,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});

const AuthenticationProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const userData = await AsyncStorage.getItem('@SVB:UserData');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (userData) {
        setUser(JSON.parse(userData));

        Api.defaults.headers.Authorization = `Bearer ${
          JSON.parse(userData).token.str
        }`;
      } else {
        AsyncStorage.setItem('@SVB:UserData', JSON.stringify(InitialUser));
        setUser(InitialUser);
      }

      setLoading(false);
    }

    loadStorageData();
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{user, setUser, loading, setLoading}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
