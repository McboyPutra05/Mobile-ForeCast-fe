import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { ROUTES } from './routeNames';
import { LoginPage, RegisterPage } from '../pages/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterPage} />
    </Stack.Navigator>
  );
};

