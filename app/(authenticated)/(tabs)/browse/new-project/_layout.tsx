import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';

const Layout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
        headerTintColor: Colors.primary,
        headerTitleStyle: { color: '#000' },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'New Project',
          headerTransparent: true,
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.dismiss()} color={Colors.primary} />
          ),
        }}
      />
      <Stack.Screen
        name="color-select"
        options={{
          title: 'Color',
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};
export default Layout;
