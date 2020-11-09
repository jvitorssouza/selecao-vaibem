import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import LoadingCard from '../Components/Loading';
import useAuthentication from '../utils/Hooks/UseUser';

const Routes: React.FC = () => {
  const {user, loading} = useAuthentication();

  const token = user?.token;
  const tokenIsValid = token && Date.now() <= token?.exp * 1000;
  const isAuthenticated = user && user.id !== 0 && tokenIsValid;

  if (loading) {
    return <LoadingCard />;
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
