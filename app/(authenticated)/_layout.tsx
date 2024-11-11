import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, useWindowDimensions, Text, Button, View } from 'react-native';
import { Colors } from '@/constants/Colors';
const Layout = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="task/[id]"
        options={{
          title: '',
          presentation: 'formSheet',
          sheetAllowedDetents: height > 700 ? [0.22] : 'fitToContents',
          sheetGrabberVisible: false,
          sheetCornerRadius: 10,
          headerShown: false,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
      <Stack.Screen
        name="task/new"
        options={{
          title: '',
          presentation: 'formSheet',
          sheetAllowedDetents: height > 700 ? [0.22] : 'fitToContents',
          sheetGrabberVisible: false,
          sheetCornerRadius: 10,
          headerShown: false,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
      <Stack.Screen
        name="task/date-select"
        options={{
          title: 'Schedule',
          presentation: 'formSheet',
          sheetAllowedDetents: height > 700 ? [0.7, 0.99] : 'fitToContents',
          sheetGrabberVisible: true,
          sheetCornerRadius: 10,
          sheetExpandsWhenScrolledToEdge: false,
          unstable_sheetFooter: () => <View style={{ height: 300, backgroundColor: '#fff' }} />,
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.back()} color={Colors.primary} />
          ),
        }}
      />
    </Stack>
  );
};
export default Layout;
