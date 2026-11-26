import { NavigatorScreenParams } from '@react-navigation/native';
import { ROUTES } from './routeNames';

export type MainTabParamList = {
  [ROUTES.DASHBOARD]: undefined;
  [ROUTES.CHARTS]: undefined;
  [ROUTES.CALENDAR]: undefined;
  [ROUTES.NEWS]: undefined;
  [ROUTES.HISTORY]: undefined;
};

export type RootStackParamList = {
  [ROUTES.AUTH_STACK]: undefined;
  [ROUTES.MAIN_TABS]: NavigatorScreenParams<MainTabParamList>;
  [ROUTES.CHATBOT]: { context?: string } | undefined;
  [ROUTES.NOTIFICATION]: undefined;
  [ROUTES.SETTINGS]: undefined;
};

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
};

