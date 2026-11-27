import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ROUTES } from './routeNames';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { ChatbotPage } from '../pages/chatbot';
import { NotificationPage } from '../pages/notification';
import { SettingsPage } from '../pages/settings';
import { ProfileDrawer } from '../components/common/ProfileDrawer';
import { CustomToast } from '../components/common/CustomToast';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeColors } from '../store/useUIStore';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const colors = useThemeColors();

  const handleDrawerNavigate = (route: string, params?: Record<string, unknown>) => {
    if (!navigationRef.isReady()) return;
    (navigationRef as any).navigate(route, params);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={[styles.rootContainer, { backgroundColor: colors.bgApp }]}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bgApp },
          }}
        >
          {!isAuthenticated ? (
            <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthNavigator} />
          ) : (
            <>
              <Stack.Screen name={ROUTES.MAIN_TABS} component={TabNavigator} />
              <Stack.Screen
                name={ROUTES.CHATBOT}
                component={ChatbotPage}
                options={{
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name={ROUTES.NOTIFICATION}
                component={NotificationPage}
                options={{
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name={ROUTES.SETTINGS}
                component={SettingsPage}
                options={{
                  animation: 'slide_from_right',
                }}
              />
            </>
          )}
        </Stack.Navigator>

        <ProfileDrawer onNavigate={handleDrawerNavigate} />
        <CustomToast />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
