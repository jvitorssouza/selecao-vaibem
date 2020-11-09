import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Details from '../pages/Details';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor="#825DC1" />

    <AppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#825DC1',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="Details"
        component={Details}
        initialParams={{
          establishmentId: 0,
        }}
      />
    </AppStack.Navigator>
  </>
);

export default AppRoutes;
