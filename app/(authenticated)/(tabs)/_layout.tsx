import { Colors } from '@/constants/Colors';
import { Tabs } from '@/components/Tabs';
import { useEffect } from 'react';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { Platform } from 'react-native';

const Layout = () => {
  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: 'appl_kuSYZRbTZgifEDSXguTFNWsiHdE' });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: '<revenuecat_project_google_api_key>' });
    }
  }, []);
  return (
    <Tabs
      ignoresTopSafeArea
      hapticFeedbackEnabled
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
      }}>
      <Tabs.Screen
        name="today"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'calendar.circle.fill' : 'calendar.circle',
          }),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: 'Upcoming',
          tabBarIcon: () => ({ sfSymbol: 'calendar' }),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'text.magnifyingglass' : 'magnifyingglass',
          }),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'doc.text.image.fill' : 'doc.text.image',
          }),
        }}
      />
    </Tabs>
  );
};
export default Layout;
