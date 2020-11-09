import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from '../routes';
import AuthenticationProvider from '../utils/Contexts/Authentication';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthenticationProvider>
        <Routes />
      </AuthenticationProvider>
    </NavigationContainer>
  );
};

export default App;
