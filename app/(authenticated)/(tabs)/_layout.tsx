import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MoreButton from '@/components/MoreButton';
import * as Haptics from 'expo-haptics';
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
        tabBarStyle: {
          backgroundColor: '#FEFAFA',
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="today"
        options={{
          title: 'Today',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'calendar-number' : 'calendar-number-outline'}
              size={size}
              color={color}
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: 'Upcoming',
          headerRight: () => <MoreButton />,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'card-text' : 'card-text-outline'}
              size={size}
              color={color}
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
    </Tabs>
  );
};
export default Layout;
