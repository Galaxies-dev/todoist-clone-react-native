import { Stack } from 'expo-router';
import MoreButton from '@/components/MoreButton';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: 'Upcoming',
          headerRight: () => <MoreButton pageName="Upcoming" />,
        }}
      />
    </Stack>
  );
};
export default Layout;
