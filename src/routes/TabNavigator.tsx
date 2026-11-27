import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LayoutGrid,
  CandlestickChart,
  CalendarDays,
  Newspaper,
  History,
} from 'lucide-react-native';
import { MainTabParamList } from './types';
import { ROUTES } from './routeNames';
import { DashboardPage } from '../pages/dashboard';
import { ChartsPage } from '../pages/charts';
import { CalendarPage } from '../pages/calendar';
import { NewsPage } from '../pages/news';
import { HistoryPage } from '../pages/history';
import { FONTS } from '../constants/typography';
import { useThemeColors } from '../store/useUIStore';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator = () => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const activeColor = colors.mode === 'dark' ? colors.textPrimary : colors.accentNavy;

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bgApp,
          borderTopWidth: 1,
          borderTopColor: colors.borderSubtle,
          height: 58 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
          elevation: 0,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: FONTS.sans,
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.2,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardPage}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutGrid size={20} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CHARTS}
        component={ChartsPage}
        options={{
          tabBarLabel: 'Charts',
          tabBarIcon: ({ color }) => <CandlestickChart size={20} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CALENDAR}
        component={CalendarPage}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => <CalendarDays size={20} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.NEWS}
        component={NewsPage}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => <Newspaper size={20} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.HISTORY}
        component={HistoryPage}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => <History size={20} color={color} strokeWidth={1.8} />,
        }}
      />
    </Tab.Navigator>
  );
};
