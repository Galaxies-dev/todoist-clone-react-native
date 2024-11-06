import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from 'react-native-bottom-tabs/react-navigation';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createNativeBottomTabNavigator();

export const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof Navigator,
  any,
  NativeBottomTabNavigationEventMap
>(Navigator);
