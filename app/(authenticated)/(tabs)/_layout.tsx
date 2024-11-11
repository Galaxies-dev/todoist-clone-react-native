import { Colors } from '@/constants/Colors';
import { Tabs } from '@/components/Tabs';
import { RevenueCatProvider } from '@/providers/RevenueCat';

const Layout = () => {
  return (
    <RevenueCatProvider>
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
    </RevenueCatProvider>
  );
};
export default Layout;
