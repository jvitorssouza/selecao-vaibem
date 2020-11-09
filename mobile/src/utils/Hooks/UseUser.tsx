import {useContext} from 'react';

import {AuthenticationContext} from '../Contexts/Authentication';

export default function useAuthentication() {
  const context = useContext(AuthenticationContext);
  const {user, setUser, loading, setLoading} = context;

  return {user, setUser, loading, setLoading};
}
