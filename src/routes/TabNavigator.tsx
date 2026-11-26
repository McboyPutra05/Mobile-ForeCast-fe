import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Radar,
  CandlestickChart,
  CalendarDays,
  Newspaper,
  CheckCircle,
} from 'lucide-react-native';
import { MainTabParamList } from './types';
import { ROUTES } from './routeNames';
import { DashboardPage } from '../pages/dashboard';
import { ChartsPage } from '../pages/charts';
import { CalendarPage } from '../pages/calendar';
import { NewsPage } from '../pages/news';
import { HistoryPage } from '../pages/history';
import { COLORS } from '../constants/colors';
import { FONTS } from '../constants/typography';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.sentimentBullish,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardPage}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Radar size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CHARTS}
        component={ChartsPage}
        options={{
          tabBarLabel: 'Charts',
          tabBarIcon: ({ color, size }) => (
            <CandlestickChart size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.CALENDAR}
        component={CalendarPage}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <CalendarDays size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.NEWS}
        component={NewsPage}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => <Newspaper size={size - 2} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.HISTORY}
        component={HistoryPage}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => <CheckCircle size={size - 2} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    height: 66,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '600',
  },
});

